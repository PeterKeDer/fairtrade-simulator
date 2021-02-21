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

export type GameObject = {
    location: Point,
    width: number,
    height: number,
    image: string,
};

export class Game {
    public player: Player = {
        location: {
            x: 0,
            y: 0,
        },
        facingDirection: 'front',
    };
    public gameObjects: Array<GameObject>;

    constructor() {
        this.populateGameObjectsArray();
    }

    /// Process player movement
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
                let plant = {
                    location: {
                        x: i,
                        y: j,
                    },
                    width: 1,
                    height: 1,
                    image: IMAGE_NAMES.coffeePlant,
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
                }
                gameObjects.push(dryer);
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
