import { GRID_WIDTH, PLAYER_SPEED, IMAGE_NAMES, MAP_WIDTH, MAP_HEIGHT } from "./constants";

export type Point = {
    x: number,
    y: number,
};

export type Player = {
    location: Point,
    facingDirection: 'front' | 'back' | 'left' | 'right',
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

export type GameObject = {
    location: Point,
    width: number,
    height: number,
    image: string,
    collision?: Zone,
};

export class Game {
    public player: Player = {
        location: {
            x: 1,
            y: 1,
        },
        facingDirection: 'front',
    };
    public gameObjects: Array<GameObject>;

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

            if (target_x > collision_x0 &&
                target_x < collision_x1 &&
                target_y > collision_y0 &&
                target_y < collision_y1) {
                return true;
            }
        }
        return false;
    }

    // Process player movement
    public process(movement: Movement) {
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

    private populateGameObjectsArray() {
        let gameObjects: Array<GameObject> = [];
        // add house
        let house = {
            location: {
                x: 2,
                y: 2,
            },
            width: 6,
            height: 4,
            image: IMAGE_NAMES.house,
            collision: {
                x0: 2,
                y0: 3,
                width: 6,
                height: 3,
            }
        };
        gameObjects.push(house);

        // add coffee plants
        for (let i = 4; i <= 8; i += 2) {
            for (let j = 9; j < 17; j++) {
                let plant = {
                    location: {
                        x: i,
                        y: j,
                    },
                    width: 1,
                    height: 1,
                    image: IMAGE_NAMES.coffeePlant,
                    collision: {
                        x0: i + 0.1,
                        y0: j + 0.25,
                        width: 0.8,
                        height: 0.5,
                    }
                }
                gameObjects.push(plant);
            }
        }

        // add coffee bean dryers
        for (let i = 11; i <= 14; i += 3) {
            for (let j = 6; j <= 9; j += 3) {
                let dryer = {
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
                }
                gameObjects.push(dryer);
            }
        }

        // add Top/Bottom fences
        for (let i = 0; i < MAP_WIDTH; i += 1) {
            let fenceTop = {
                location: {
                    x: i,
                    y: 0,
                },
                width: 1,
                height: 1,
                image: IMAGE_NAMES.environmentFenceHorizontal,
                collision: {
                    x0: i,
                    y0: 0,
                    width: 1,
                    height: 1,
                }
            }
            let fenceBot = {
                location: {
                    x: i,
                    y: MAP_HEIGHT-1,
                },
                width: 1,
                height: 1,
                image: IMAGE_NAMES.environmentFenceHorizontal,
                collision: {
                    x0: i,
                    y0: MAP_HEIGHT-1,
                    width: 1,
                    height: 1,
                }
            }
            gameObjects.push(fenceTop);
            gameObjects.push(fenceBot);
        }

        
        // add side fences
        for (let i = 0; i < MAP_HEIGHT; i += 1) {
            let fenceLeft = {
                location: {
                    x: 0,
                    y: i,
                },
                width: 1,
                height: 1,
                image: IMAGE_NAMES.environmentFenceLeft,
                collision: {
                    x0: 0,
                    y0: i,
                    width: 0.2,
                    height: 1,
                }
            }
            let fenceRight = {
                location: {
                    x: MAP_WIDTH-1,
                    y: i,
                },
                width: 1,
                height: 1,
                image: IMAGE_NAMES.environmentFenceRight,
                collision: {
                    x0: MAP_WIDTH-0.2,
                    y0: i,
                    width: 0.2,
                    height: 1,
                }
            }
            gameObjects.push(fenceLeft);
            gameObjects.push(fenceRight);
        }

        // add truck
        let truck = {
            location: {
                x: 10,
                y: 1,
            },
            width: 6,
            height: 3,
            image: IMAGE_NAMES.environmentTruckFairTrade,
            collision: {
                x0: 10,
                y0: 2,
                width: 5.5,
                height: 2,
            }
        };
        gameObjects.push(truck);

        this.gameObjects = gameObjects;
    }
}
