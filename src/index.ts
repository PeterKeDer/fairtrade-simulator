import { FPS, PLAYER_SIZE, MAP_HEIGHT, MAP_WIDTH, GRID_WIDTH, IMAGE_NAMES, TOP_BAR_HEIGHT } from './constants';
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
    const interact = controller.getInteract();
    game.process(movement, interact);

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

    // FOR DEBUGGING PURPOSES
    // for (let obj of game.gameObjects) {
    //     // TODO: remove this later
    //     if (obj.collision === undefined) {
    //         continue;
    //     }

    //     let { x, y } = calculatePosition({ x: obj.collision.x0, y: obj.collision.y0 });
    //     let { x: maxX, y: maxY } = calculatePosition({
    //         x: obj.collision.x0 + obj.collision.width,
    //         y: obj.collision.y0 + obj.collision.height,
    //     });

    //     context.lineWidth = 4;
    //     context.strokeStyle = "red";
    //     context.beginPath();
    //     context.rect(x, y, maxX - x, maxY - y);
    //     context.stroke();
    // }

    // Draw player
    let imageName;
    if (!game.player.isWatering) {
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
    } else {
        switch (game.player.facingDirection) {
            case 'front':
                imageName = IMAGE_NAMES.farmerWaterFront;
                break;
            case 'back':
                imageName = IMAGE_NAMES.farmerWaterBack;
                break;
            case 'left':
                imageName = IMAGE_NAMES.farmerWaterLeft;
                break;
            case 'right':
                imageName = IMAGE_NAMES.farmerWaterRight;
                break;
        }
    }

    context.imageSmoothingEnabled = false;
    if (game.player.shakeAnimation === undefined) {
        context.drawImage(images[imageName], playerPosition.x, playerPosition.y, GRID_WIDTH, GRID_WIDTH);
    } else {
        context.drawImage(images[imageName], playerPosition.x, playerPosition.y + GRID_WIDTH * 0.03 * Math.sin(game.player.shakeAnimation), GRID_WIDTH, GRID_WIDTH);
    }

    if (game.dialogues.length > 0) {
        const margin = 30;
        const startY = 0.8 * canvas.height;
        context.fillStyle = 'white';
        context.fillRect(margin, startY, canvas.width - 2 * margin, canvas.height - margin - startY);
        context.strokeStyle = '10px solid black';
        context.strokeRect(margin, startY, canvas.width - 2 * margin, canvas.height - startY - margin);

        context.font = '24px "Press Start 2P"';
        context.fillStyle = 'black';
        context.fillText(game.dialogues[0], 2 * margin, startY + 2 * margin, canvas.width - 4 * margin);
    }

    if (game.darkOverlay !== undefined) {
        context.fillStyle = 'black';
        context.globalAlpha = game.darkOverlay;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }


    // Render top navigation
    context.beginPath();
    context.rect(0, 0, canvas.width, TOP_BAR_HEIGHT);
    context.fillStyle = '#b47433';
    context.fill();

    context.drawImage(images[IMAGE_NAMES.interfaceCoffeeBean], canvas.width - 2 * GRID_WIDTH, 0, TOP_BAR_HEIGHT, TOP_BAR_HEIGHT);
    context.drawImage(images[IMAGE_NAMES.interfaceCoin], canvas.width - 5 * GRID_WIDTH, 5, TOP_BAR_HEIGHT, TOP_BAR_HEIGHT-10);

    context.font = "30px Arial";
    context.fillText("2", canvas.width - 2 * GRID_WIDTH + TOP_BAR_HEIGHT, 0);
    context.fillText("10", canvas.width - 5 * GRID_WIDTH + TOP_BAR_HEIGHT, 0);


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
