import { FPS, PLAYER_SIZE, MAP_HEIGHT, MAP_WIDTH, GRID_WIDTH, IMAGE_NAMES } from './constants';
import { Controller } from './controller';
import { Game, Point, GameObject } from './game';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d');

context.imageSmoothingEnabled = false;

const game = new Game();
const controller = new Controller();

function render() {
    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Adjust canvas width/height
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Move player
    const movement = controller.getMovement();
    game.process(movement);

    const playerPosition = calculatePlayerPosition(game.player.location);

    /// Utility function to calculate the position on canvas
    function calculatePosition(gridLocation: Point): Point {
        return calculateObjectPosition(gridLocation, game.player.location, playerPosition);
    }

    // Draw grid lines
    context.strokeStyle = 'grey';

    for (let i = 0; i <= MAP_WIDTH; i++) {
        context.beginPath();
        let from = calculatePosition({ x: i, y: 0 });
        let to = calculatePosition({ x: i, y: MAP_HEIGHT });
        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
        context.stroke();
    }

    for (let j = 0; j <= MAP_HEIGHT; j++) {
        context.beginPath();
        let from = calculatePosition({ x: 0, y: j });
        let to = calculatePosition({ x: MAP_WIDTH, y: j });
        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
        context.stroke();
    }

    // Draw game objects
    // TODO: get these objects from game
    // const gameObjects: GameObject[] =

    for (let obj of game.gameObjects) {
        // TODO: remove this later
        if (obj.image === '') {
            continue;
        }

        let { x, y } = calculatePosition(obj.location);
        let { x: maxX, y: maxY } = calculatePosition({
            x: obj.location.x + obj.width,
            y: obj.location.y + obj.height,
        });

        // Check that image is inside canvas
        if ((x > canvas.width || maxX < 0) && (y > canvas.height && maxY < 0)) {
            continue;
        }

        const image = images[obj.image];
        context.imageSmoothingEnabled = false;
        context.drawImage(image, x, y, maxX - x, maxY - y);
    }

    // Draw player
    let imageName;
    switch (game.player.facingDirection) {
        case 'front':
            imageName = IMAGE_NAMES.farmerFront;
            break;
        case 'back':
            imageName = IMAGE_NAMES.farmerBack;
            break;
        case 'left':
            imageName = IMAGE_NAMES.farmerLeft;
            break;
        case 'right':
            imageName = IMAGE_NAMES.farmerRight;
            break;
    }
    context.imageSmoothingEnabled = false;
    context.drawImage(images[imageName], playerPosition.x, playerPosition.y, GRID_WIDTH, GRID_WIDTH);
}

/// Calculate the player's current position on the canvas, from the grid location
function calculatePlayerPosition(playerLocation: Point): Point {
    let up = playerLocation.y * GRID_WIDTH;
    let down = (MAP_HEIGHT - playerLocation.y) * GRID_WIDTH;
    let left = playerLocation.x * GRID_WIDTH;
    let right = (MAP_WIDTH - playerLocation.x) * GRID_WIDTH;

    const halfWidth = canvas.width / 2;
    const halfHeight = canvas.height / 2;

    let x: number;
    let y: number;
    if (left < halfWidth) {
        x = left;
    } else if (right < halfWidth) {
        x = canvas.width - right;
    } else {
        x = halfWidth;
    }
    if (up < halfHeight) {
        y = up;
    } else if (down < halfHeight) {
        y = canvas.height - down;
    } else {
        y = halfHeight;
    }

    return { x, y };
}

/// Calculate the position in the canvas of a given point
function calculateObjectPosition(
    gridLocation: Point,
    playerGridLocation: Point,
    playerPosition: Point,
): Point {
    return {
        x: playerPosition.x + GRID_WIDTH * (gridLocation.x - playerGridLocation.x),
        y: playerPosition.y + GRID_WIDTH * (gridLocation.y - playerGridLocation.y),
    };
}

let images: { [imageName: string]: CanvasImageSource } = {};

function loadImages(callback: () => void) {
    Promise.all(Object.values(IMAGE_NAMES)
        .map(imageName => new Promise((resolve, _) => {
            const image = new Image();
            image.src = `assets/${imageName}`;
            images[imageName] = image;

            image.onload = () => resolve(true);
        })))
        .then(() => callback());
}

loadImages(() => setInterval(render, 1000 / FPS));
