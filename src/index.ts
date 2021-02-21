import { FPS, PLAYER_SIZE, MAP_HEIGHT, MAP_WIDTH, GRID_WIDTH } from './constants';
import { Controller } from './controller';
import { Game, Point } from './game';
import { drawTreeArray, displayText, displayHouse } from './environment';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d');

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

    // Draw Environment
    
    drawTreeArray(50, 300, context);
    drawTreeArray(50, 400, context);
    displayText(game.player.location.x, game.player.location.y, context);
    displayHouse(600,-10,context);
    
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

    // Draw player
    context.beginPath();
    context.arc(playerPosition.x, playerPosition.y, PLAYER_SIZE / 2, 0, 2 * Math.PI);
    context.fillStyle = 'black';
    context.fill();



    // Add behind elements.
    context.globalCompositeOperation = 'destination-over'
    // Now draw!
    context.fillStyle = "#6cc59e";
    context.fillRect(0, 0, canvas.width, canvas.height);
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

setInterval(render, 1000 / FPS);
