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
}
