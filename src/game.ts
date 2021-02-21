import { GRID_WIDTH, PLAYER_SPEED, IMAGE_NAMES, MAP_WIDTH, MAP_HEIGHT, FENCE_OFF_SET } from "./constants";

export type Point = {
    x: number,
    y: number,
};

export type Player = {
    location: Point,
    facingDirection: 'front' | 'back' | 'left' | 'right',
    shakeAnimation?: number,
    isWatering: boolean,
};

export type Movement = {
    dx: number,
    dy: number,
};

export type Zone = {
    x0: number,
    y0: number,
    width: number,
    height: number,
}

export interface Interactable {
    location: Point,
    width: number,
    height: number,
    onInteract: () => void,
};

export type GameObject = {
    location: Point,
    width: number,
    height: number,
    image: string,
    collision?: Zone,
    interaction?: Interactable,
};

class CoffeePlant implements Interactable {
    location: Point;
    width: number;
    height: number;
    state: 'unharvested' | 'harvested' | 'watered';

    constructor(private game: Game, private object: GameObject, private dirt: GameObject) {
        this.state = 'unharvested';
        this.location = {
            x: object.location.x - 0.5,
            y: object.location.y,
        }
        this.width = 2;
        this.height = 1;
    }

    onInteract() {
        switch (this.state) {
            case 'unharvested':
                this.state = 'harvested';
                this.game.numHarvestedCoffee++;
                this.object.image = IMAGE_NAMES.coffeePlant;
                this.game.startPlayerShaking();
                break;
            case 'harvested':
                this.state = 'watered';
                this.dirt.image = IMAGE_NAMES.textureWetDirt;
                this.game.player.isWatering = true;
                this.game.startPlayerShaking();
                break;
            case 'watered':
                break;
        }
    }
}

class CoffeeRack implements Interactable {
    location: Point;
    width: number;
    height: number;
    state: 'empty' | 'drying' | 'dried';

    constructor(private game: Game, private object: GameObject) {
        this.state = 'empty';
        this.location = {
            x: object.location.x - 0.5,
            y: object.location.y - 0.5,
        }
        this.width = 2;
        this.height = 2;
    }

    onInteract() {
        switch (this.state) {
            case 'empty':
                if (this.game.numHarvestedCoffee >= 4) {
                    this.game.numHarvestedCoffee -= 4;
                    this.state = 'drying';
                    this.object.image = IMAGE_NAMES.coffeeRackDrying;
                    this.game.startPlayerShaking();
                }
                break;
            case 'drying':
                break;
            case 'dried':
                this.game.numDriedCoffee += 4;
                this.state = 'empty';
                this.object.image = IMAGE_NAMES.coffeeRack;
                this.game.startPlayerShaking();
                break;
        }
    }
}

class NPC implements Interactable {
    location: Point;
    width: number;
    height: number;

    constructor(private game: Game, object: GameObject, private dialogues: { nonFairTrade: string[], fairTrade: string[]}) {
        this.location = {
            x: object.location.x - 0.5,
            y: object.location.y - 0.5,
        }
        this.width = 2;
        this.height = 2;
    }

    onInteract() {
        if (this.game.isFairTrade) {
            this.game.dialogues = [...this.dialogues.fairTrade];
        } else {
            this.game.dialogues = [...this.dialogues.nonFairTrade];
        }
    }
}

export class Game {
    public player: Player = {
        location: {
            x: 25,
            y: 5,
        },
        facingDirection: 'front',
        isWatering: false,
    };
    public gameObjects: Array<GameObject>;

    public dialogues: string[] = [];

    public numHarvestedCoffee: number = 0;
    public numDriedCoffee: number = 0;

    public isFairTrade: boolean = false;

    constructor() {
        this.populateGameObjectsArray();
    }

    // Check if the movement is legal
    public illegalStep(target: Point) {
        console.log(target);
        let target_x = target.x + 0.5;
        let target_y = target.y + 0.5;
        for (let obj of this.gameObjects) {

            if (obj.collision === undefined) {
                continue;
            }

            let collision_x0 = obj.collision.x0;
            let collision_y0 = obj.collision.y0;
            let collision_x1 = obj.collision.x0 + obj.collision.width;
            let collision_y1 = obj.collision.y0 + obj.collision.height;

            if (target_x >= collision_x0 &&
                target_x <= collision_x1 &&
                target_y >= collision_y0 &&
                target_y <= collision_y1) {
                return true;
            }
        }
        return false;
    }

    /// Process player movement
    public process(movement: Movement, interact: boolean) {
        if (this.dialogues.length > 0) {
            if (interact) {
                this.dialogues.splice(0, 1);
            }
            return;
        }

        // TODO: probably add cooldown to interaction? where player is locked in place
        if (this.player.shakeAnimation !== undefined) {
            this.player.shakeAnimation += 0.2 * Math.PI;
            if (this.player.shakeAnimation > 6 * Math.PI) {
                this.player.shakeAnimation = undefined;
                this.player.isWatering = false;
            }

        } else if (interact) {
            const playerCenterX = this.player.location.x + 0.5;
            const playerCenterY = this.player.location.y + 0.5;
            for (let obj of this.gameObjects) {
                if (obj.interaction !== undefined) {
                    const interaction = obj.interaction;
                    if (interaction.location.x <= playerCenterX &&
                        playerCenterX <= interaction.location.x + interaction.width &&
                        interaction.location.y <= playerCenterY &&
                        playerCenterY <= interaction.location.y + interaction.height
                    ) {
                        interaction.onInteract();
                        break;
                    }
                }
            }

        } else {
            // Move
            let { dx, dy } = movement;

            if (dx === 1 && dy === 0 || dx === 1 && this.player.facingDirection === 'right') {
                this.player.facingDirection = 'right';
            } else if (dx === -1 && dy === 0 || dx === -1 && this.player.facingDirection === 'left') {
                this.player.facingDirection = 'left';
            } else if (dx === 0 && dy === 1 || dy === 1 && this.player.facingDirection === 'front') {
                this.player.facingDirection = 'front';
            } else if (dx === 0 && dy === -1 || dy === -1 && this.player.facingDirection === 'back') {
                this.player.facingDirection = 'back';
            }

            if (Math.abs(dx) !== 0 && Math.abs(dy) !== 0) {
                dx /= Math.SQRT2;
                dy /= Math.SQRT2;
            }

            var next = {
                x: this.player.location.x + dx * PLAYER_SPEED,
                y: this.player.location.y + dy * PLAYER_SPEED,
            }

            if (!this.illegalStep(next)) {
                // console.log("Move");
                this.player.location.x = next.x;
                this.player.location.y = next.y;
            } else {
                console.log("Illegal step!");
            }
        }
    }

    public startPlayerShaking() {
        this.player.shakeAnimation = 0;
    }

    private populateGameObjectsArray() {
        let gameObjects: Array<GameObject> = [];

        // add background tiles (game board 30 x 20)
        // grass
        for (let i = 0; i <= MAP_WIDTH; i++) {
            for (let j = 0; j <= MAP_HEIGHT; j++) {
                let grass = {
                    location: {
                        x: i,
                        y: j,
                    },
                    width: 1,
                    height: 1,
                    image: IMAGE_NAMES.textureGrass
                }
                gameObjects.push(grass);
            }
        }

        // add house
        let houseLocation = {
            x: 20,
            y: 2,
        }
        let house = {
            location: {
                x: houseLocation.x,
                y: houseLocation.y,
            },
            width: 4,
            height: 2,
            image: IMAGE_NAMES.house,
            collision: {
                x0: houseLocation.x,
                y0: houseLocation.y,
                width: 4,
                height: 2,
            }
        };
        gameObjects.push(house);

        // add coffee plants and dirt
        for (let i = 4; i <= 8; i += 2) {
            for (let j = 9; j < 17; j++) {
                let dirt = {
                    location: {
                        x: i,
                        y: j,
                    },
                    width: 1,
                    height: 1,
                    image: IMAGE_NAMES.textureDirt,
                };
                gameObjects.push(dirt);

                let obj: GameObject = {
                    location: {
                        x: i,
                        y: j,
                    },
                    width: 1,
                    height: 1,
                    image: IMAGE_NAMES.coffeePlantBerries,
                    collision: {
                        x0: i + 0.1,
                        y0: j + 0.25,
                        width: 0.8,
                        height: 0.5,
                    }
                };
                const coffeePlant = new CoffeePlant(this, obj, dirt);
                obj.interaction = coffeePlant;
                gameObjects.push(obj);
            }
        }

        // add coffee bean dryers
        for (let i = 11; i <= 17; i += 3) {
            for (let j = 6; j <= 9; j += 3) {
                let obj: GameObject = {
                    location: {
                        x: i,
                        y: j,
                    },
                    width: 1,
                    height: 1,
                    image: IMAGE_NAMES.coffeeRack,
                    collision: {
                        x0: i + 0.15,
                        y0: j + 0.1,
                        width: 0.7,
                        height: 0.8,
                    }
                };
                const coffeeRack = new CoffeeRack(this, obj);
                obj.interaction = coffeeRack;
                gameObjects.push(obj);
            }
        }

        // add Top/Bottom fences
        var fence
        for (let i = 0; i < MAP_WIDTH - 1; i += 1) {
            let fenceTop = {
                location: {
                    x: i + FENCE_OFF_SET,
                    y: FENCE_OFF_SET,
                },
                width: 1,
                height: 1,
                image: IMAGE_NAMES.environmentFenceHorizontal,
                collision: {
                    x0: i + FENCE_OFF_SET,
                    y0: FENCE_OFF_SET,
                    width: 1,
                    height: 1,
                }
            }
            let fenceBot = {
                location: {
                    x: i + FENCE_OFF_SET,
                    y: MAP_HEIGHT - 1 - FENCE_OFF_SET,
                },
                width: 1,
                height: 1,
                image: IMAGE_NAMES.environmentFenceHorizontal,
                collision: {
                    x0: i + FENCE_OFF_SET,
                    y0: MAP_HEIGHT - 1 - FENCE_OFF_SET,
                    width: 1,
                    height: 1,
                }
            }
            gameObjects.push(fenceTop);
            gameObjects.push(fenceBot);
        }


        // add side fences
        for (let i = 4; i < MAP_HEIGHT - 1; i += 1) {
            let fenceLeft = {
                location: {
                    x: FENCE_OFF_SET,
                    y: i + FENCE_OFF_SET,
                },
                width: 1,
                height: 1,
                image: IMAGE_NAMES.environmentFenceLeft,
                collision: {
                    x0: FENCE_OFF_SET,
                    y0: i + FENCE_OFF_SET,
                    width: 0.2,
                    height: 1,
                }
            }
            gameObjects.push(fenceLeft);
        }
        for (let i = 0; i < MAP_HEIGHT - 1; i += 1) {
            let fenceRight = {
                location: {
                    x: MAP_WIDTH - 1 - FENCE_OFF_SET,
                    y: i + FENCE_OFF_SET,
                },
                width: 1,
                height: 1,
                image: IMAGE_NAMES.environmentFenceRight,
                collision: {
                    x0: MAP_WIDTH - 0.2 - FENCE_OFF_SET,
                    y0: i + FENCE_OFF_SET,
                    width: 0.2,
                    height: 1,
                }
            }
            gameObjects.push(fenceRight);
        }

        // Placehold air wall
        for (let i = 1; i < 4; i += 1) {
            let fenceLeft = {
                location: {
                    x: FENCE_OFF_SET,
                    y: i + FENCE_OFF_SET,
                },
                width: 0,
                height: 1,
                image: IMAGE_NAMES.environmentFenceLeft,
                collision: {
                    x0: FENCE_OFF_SET,
                    y0: i + FENCE_OFF_SET,
                    width: 0.2,
                    height: 1,
                }
            }
            gameObjects.push(fenceLeft);
        }

        // add road
        for (let i = 0; i < 18; i += 1) {
            let road = {
                location: {
                    x: i,
                    y: 3.5,
                },
                width: 1,
                height: 1,
                image: IMAGE_NAMES.environmentRoad,
            };
            gameObjects.push(road);
        }

        // add truck
        let truck = {
            location: {
                x: 10,
                y: 1.2,
            },
            width: 6,
            height: 3,
            image: IMAGE_NAMES.environmentTruckFairTrade,
            collision: {
                x0: 10,
                y0: 2.2,
                width: 5.5,
                height: 2,
            }
        };
        gameObjects.push(truck);

        // add npcs
        let npc1: GameObject = {
            location: {
                x: 9,
                y: 11,
            },
            width: 1,
            height: 1,
            image: IMAGE_NAMES.npc1,
            collision: {
                x0: 9.25,
                y0: 11.25,
                width: 0.5,
                height: 0.5,
            }
        }
        let npc1i = new NPC(this, npc1, {
            fairTrade: ["With Fairtrade’s bonus premiums, we can finally start investing back into our farm and in our children’s educations!"],
            nonFairTrade: ["Another day of barely scraping by.", "It’s impossible to save money under these conditions..."],
        });
        npc1.interaction = npc1i;
        gameObjects.push(npc1);

        let npc2: GameObject = {
            location: {
                x: 10,
                y: 6,
            },
            width: 1,
            height: 1,
            image: IMAGE_NAMES.npc2,
            collision: {
                x0: 10.25,
                y0: 6.25,
                width: 0.5,
                height: 0.5,
            }
        }
        let npc2i = new NPC(this, npc2, {
            fairTrade: ["I’m really glad Fairtrade has a minimum buy price safety net for us.","And when the market price jumps higher, we get that, too!"],
            nonFairTrade: ["I hope the price of coffee doesn’t drop too much...", "I barely made it through the last recession."],
        });
        npc2.interaction = npc2i;
        gameObjects.push(npc2);

        let npc3: GameObject = {
            location: {
                x: 8,
                y: 3,
            },
            width: 1,
            height: 1,
            image: IMAGE_NAMES.npc3,
            collision: {
                x0: 8.25,
                y0: 3.25,
                width: 0.5,
                height: 0.5,
            }
        }
        let npc3i = new NPC(this, npc3, {
            fairTrade: ["It feels good to have access to international markets through Fairtrade’s help.","I finally feel that my job is making a difference of sorts."],
            nonFairTrade: ["I heard people outside of our country pay good money for coffee beans.", "We could never sell for that much here."],
        });
        npc3.interaction = npc3i;
        gameObjects.push(npc3);

//         NPCs being sad
// -	“Another day of barely scraping by. It’s impossible to save money under these conditions…”
// -	“I hope the price of coffee doesn’t drop too much… I barely made it through the last recession.”
// -	“I heard people outside of our country pay good money for coffee beans. We could never sell for that much here.”
// NPCs being happy
// -	“With Fairtrade’s bonus premiums, we can finally start investing back into our farm and in our children’s educations!”
// -	“I’m really glad Fairtrade has a minimum buy price safety net for us. And when the market price jumps higher, we get that, too!”
// -	“It feels good to have access to international markets through Fairtrade’s help. I finally feel that my job is making a difference of sorts.”
// -	“Every month we get to vote on what to invest our profits in. I can’t wait to see our town grow!”

        this.gameObjects = gameObjects;
    }
}
