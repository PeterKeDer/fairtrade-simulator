export type hitBox = {
    topLeftX: number,
    topLeftY: number,
    width: number,
    height: number,
    id: number,
}

export var hitBoxArray = new Array<hitBox>(10);

var treeImg = new Image();
treeImg.src = 'assets/tree.png'
var houseImg = new Image();
houseImg.src = 'assets/house.webp'
var dirtImg = new Image();
dirtImg.src = 'assets/dirt.png'
var fenceImg = new Image();
fenceImg.src = 'assets/fenceH.png'
var fenceLImg = new Image();
fenceLImg.src = 'assets/fenceL.png'
var fenceRImg = new Image();
fenceRImg.src = 'assets/fenceR.png'
var truckCaptital = new Image();
truckCaptital.src = 'assets/truckCaptital.png'

function displayHitBox(context: CanvasRenderingContext2D) {
    console.log(hitBoxArray);
    for (const box of hitBoxArray) {
        context.beginPath();
        context.rect(box.topLeftX, box.topLeftY + 50, 100, 50);
        context.stroke();
    }
}

function checkHitBox(x: number, y: number, context: CanvasRenderingContext2D) {
    for (const box of hitBoxArray) {
        if (x > box.topLeftX && x < box.topLeftX + box.width && y > box.topLeftY && y < box.topLeftY + box.width) {
            return box.id;
        }
    }
    return -1;
}

export function drawTreeArray(initial_x: number, initial_y: number, context: CanvasRenderingContext2D) {
    for (let i = 0; i < 10; i++) {
        var x_coord = initial_x + 100 * i;
        var y_coord = initial_y;

        var newHitBox = {
            topLeftX: x_coord,
            topLeftY: y_coord,
            width: 100,
            height: 100,
            id: 100 + i,
        }
        hitBoxArray[i] = newHitBox;
        context.drawImage(dirtImg, x_coord, y_coord + 80, 100, 30);
        context.drawImage(treeImg, x_coord, y_coord, 100, 100);

    }
    // displayHitBox(context);

    // context.drawImage(treeImg, 100, 100, 100, 100);
}

export function displayText(x: number, y: number, context: CanvasRenderingContext2D) {
    context.font = "80px Arial";
    let hit = checkHitBox(x, y, context);
    if (hit != -1) context.strokeText("Press[E] to harvest tree #" + hit, 300, 450);
    // switch()
}


export function displayHouse(x: number, y: number, context: CanvasRenderingContext2D) {
    context.drawImage(houseImg, x, y, 200, 200);
}

export function displayGeneral(x: number, y: number, context: CanvasRenderingContext2D) {
    for (let i = 0; i < 64; i++) {
        context.drawImage(fenceImg, x+32*i, y, 64, 64);
    }
    // context.drawImage(fenceImg, x, y, 91, 64);
    // context.drawImage(treeImg, x, y, 100, 100);
    // var pat = context.createPattern(fenceImg, "repeat");
    // context.rect(x, y, 30, 64);
    // context.fillStyle = pat;
    // context.fill();
}


export function displayFenceLeft(x: number, y: number, context: CanvasRenderingContext2D) {
    for (let i = 0; i < 19; i++) {
        context.drawImage(fenceLImg, x, y+64*i, 64, 64);
    }
    // context.drawImage(fenceImg, x, y, 91, 64);
    // context.drawImage(treeImg, x, y, 100, 100);
    // var pat = context.createPattern(fenceImg, "repeat");
    // context.rect(x, y, 30, 64);
    // context.fillStyle = pat;
    // context.fill();
    for (let i = 0; i < 19; i++) {
        context.drawImage(fenceRImg, x+64*29, y+64*i, 64, 64);
    }
}


export function displayTruck(x: number, y: number, context: CanvasRenderingContext2D) {
    context.imageSmoothingEnabled = false;
    context.drawImage(truckCaptital, x, y, 1024, 512);
}

