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
        context.drawImage(dirtImg, x_coord, y_coord+80, 100, 30);
        context.drawImage(treeImg, x_coord, y_coord, 100, 100);
        
    }
    // displayHitBox(context);

    // context.drawImage(treeImg, 100, 100, 100, 100);
}

export function displayText(x: number, y:number, context: CanvasRenderingContext2D) {
    context.font = "80px Arial";
    let hit = checkHitBox(x, y, context);
    if (hit != -1) context.strokeText("Press[E] to harvest tree #" + hit, 300, 450);
    // switch()
}


export function displayHouse(x: number, y:number, context: CanvasRenderingContext2D) {
    context.drawImage(houseImg, x, y, 200, 200);
}