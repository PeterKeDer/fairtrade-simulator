import { PLAYER_SPEED } from "./constants";

export type Point = {
    x: number,
    y: number,
};

export type Player = {
    location: Point,
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
    };

    /// Process player movement
    public process(movement: Movement) {
        let { dx, dy } = movement;
        if (Math.abs(dx) !== 0 && Math.abs(dy) !== 0) {
            dx /= Math.SQRT2;
            dy /= Math.SQRT2;
        }

        this.player.location.x += dx * PLAYER_SPEED;
        this.player.location.y += dy * PLAYER_SPEED;
    }

    public populateGameObjectsArray() {
        let gameObjects: Array<GameObject> = [];
        // add house
        let house = {
            location: {
                x: 2,
                y: 2,
            },
            width: 6,
            height: 4,
            image: "assets/House_(tier_1).webp"
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
                    image: "",
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
                    image: "",
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

        return gameObjects;
    }
}
