const fps = 60;

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d');

function render() {

}

setInterval(render, 1000 / fps);
