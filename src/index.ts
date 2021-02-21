import { FPS, PLAYER_SIZE } from './constants';
import { Controller } from './controller';
import { Game } from './game';
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
    
    // Draw player
    context.beginPath();
    context.arc(game.player.location.x, game.player.location.y, PLAYER_SIZE, 0, 2 * Math.PI);
    context.fillStyle = 'black';
    context.fill();



    // Add behind elements.
    context.globalCompositeOperation = 'destination-over'
    // Now draw!
    context.fillStyle = "#6cc59e";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

setInterval(render, 1000 / FPS);
