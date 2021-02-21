import { PLAYER_SPEED, IMAGE_NAMES } from "./constants";

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
    interaction?: Interactable,
};

class CoffeePlant implements Interactable {
    location: Point;
    width: number;
    height: number;
    state: 'unharvested' | 'harvested' | 'watered';

    constructor(private game: Game, private object: GameObject) {
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
                break;
            case 'harvested':
                // TODO: player animation
                this.state = 'watered';
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
                }
                break;
            case 'drying':
                break;
            case 'dried':
                this.game.numDriedCoffee += 4;
                this.state = 'empty';
                this.object.image = IMAGE_NAMES.coffeeRack;
                break;
        }
    }
}

export class Game {
    public player: Player = {
        location: {
            x: 0,
            y: 0,
        },
        facingDirection: 'front',
    };
    public gameObjects: Array<GameObject>;

    public numHarvestedCoffee: number = 0;
    public numDriedCoffee: number = 0;

    constructor() {
        this.populateGameObjectsArray();
    }

    /// Process player movement
    public process(movement: Movement, interact: boolean) {
        // TODO: probably add cooldown to interaction? where player is locked in place
        if (interact) {
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
        }

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

        this.player.location.x += dx * PLAYER_SPEED;
        this.player.location.y += dy * PLAYER_SPEED;
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
        };
        gameObjects.push(house);

        // add coffee plants
        for (let i = 4; i <= 8; i += 2) {
            for (let j = 9; j < 17; j++) {
                let obj: GameObject = {
                    location: {
                        x: i,
                        y: j,
                    },
                    width: 1,
                    height: 1,
                    image: IMAGE_NAMES.coffeePlantBerries,
                };
                const coffeePlant = new CoffeePlant(this, obj);
                obj.interaction = coffeePlant;
                gameObjects.push(obj);
            }
        }

        // add coffee bean dryers
        for (let i = 11; i <= 14; i += 3) {
            for (let j = 6; j <= 9; j += 3) {
                let obj: GameObject = {
                    location: {
                        x: i,
                        y: j,
                    },
                    width: 1,
                    height: 1,
                    image: IMAGE_NAMES.coffeeRack,
                };
                const coffeeRack = new CoffeeRack(this, obj);
                obj.interaction = coffeeRack;
                gameObjects.push(obj);
            }
        }

        // add truck
        let truck = {
            location: {
                x: 10,
                y: 1,
            },
            width: 4,
            height: 2,
            image: "",
        };
        gameObjects.push(truck);

        this.gameObjects = gameObjects;
    }
}
