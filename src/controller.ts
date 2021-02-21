import { Movement } from './game';

export class Controller {
    private keyWDown = false;
    private keyADown = false;
    private keySDown = false;
    private keyDDown = false;

    constructor() {
        document.addEventListener('keydown', this.onKeyDown);
        document.addEventListener('keyup', this.onKeyUp);
    }

    public getMovement(): Movement {
        let dx = 0;
        let dy = 0;
        if (this.keyWDown) dy -= 1;
        if (this.keySDown) dy += 1;
        if (this.keyADown) dx -= 1;
        if (this.keyDDown) dx += 1;

        return { dx, dy };
    }

    onKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
            case 'w':
                this.keyWDown = true;
                break;
            case 'a':
                this.keyADown = true;
                break;
            case 's':
                this.keySDown = true;
                break;
            case 'd':
                this.keyDDown = true;
                break;
        }
    }

    onKeyUp = (event: KeyboardEvent) => {
        switch (event.key) {
            case 'w':
                this.keyWDown = false;
                break;
            case 'a':
                this.keyADown = false;
                break;
            case 's':
                this.keySDown = false;
                break;
            case 'd':
                this.keyDDown = false;
                break;
        }
    }
}