const fps = 60;

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d');

const PLAYER_SIZE = 10;
const PLAYER_SPEED = 2;

let keyWDown = false;
let keyADown = false;
let keySDown = false;
let keyDDown = false;

let playerLocation = {
    x: 0,
    y: 0,
};

function render() {
    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Adjust canvas width/height
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Move player
    let dx = 0;
    let dy = 0;
    if (keyWDown) dy -= PLAYER_SPEED;
    if (keySDown) dy += PLAYER_SPEED;
    if (keyADown) dx -= PLAYER_SPEED;
    if (keyDDown) dx += PLAYER_SPEED;
    if (Math.abs(dx) !== 0 && Math.abs(dy) !== 0) {
        dx /= Math.SQRT2;
        dy /= Math.SQRT2;
    }

    playerLocation.x += dx;
    playerLocation.y += dy;

    context.beginPath();
    context.arc(playerLocation.x, playerLocation.y, PLAYER_SIZE, 0, 2 * Math.PI);
    context.fillStyle = 'black';
    context.fill();
}

function setKeybindings() {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
}

function onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
        case 'w':
            keyWDown = true;
            break;
        case 'a':
            keyADown = true;
            break;
        case 's':
            keySDown = true;
            break;
        case 'd':
            keyDDown = true;
            break;
    }
}

function onKeyUp(event: KeyboardEvent) {
    switch (event.key) {
        case 'w':
            keyWDown = false;
            break;
        case 'a':
            keyADown = false;
            break;
        case 's':
            keySDown = false;
            break;
        case 'd':
            keyDDown = false;
            break;
    }
}

function initialize() {
    setKeybindings();
}

initialize();
setInterval(render, 1000 / fps);
