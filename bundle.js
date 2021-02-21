/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IMAGE_NAMES = exports.TOP_BAR_HEIGHT = exports.FENCE_OFF_SET = exports.GRID_WIDTH = exports.MAP_HEIGHT = exports.MAP_WIDTH = exports.PLAYER_SPEED = exports.PLAYER_SIZE = exports.FPS = void 0;
exports.FPS = 60;
exports.PLAYER_SIZE = 64;
exports.PLAYER_SPEED = 0.06;
exports.MAP_WIDTH = 30;
exports.MAP_HEIGHT = 20;
exports.GRID_WIDTH = 128;
exports.FENCE_OFF_SET = 0.5;
exports.TOP_BAR_HEIGHT = 80;
// TODO: add all images
exports.IMAGE_NAMES = {
    house: 'house.png',
    coffeePlant: 'coffee/coffee_plant.png',
    coffeePlantBerries: 'coffee/coffee_plant_berries.png',
    coffeeRack: 'coffee/coffee_rack.png',
    coffeeRackDrying: 'coffee/coffee_rack_drying.png',
    coffeeRackDried: 'coffee/coffee_rack_dried.png',
    farmerFront: 'farmer/farmer_front.png',
    farmerBack: 'farmer/farmer_back.png',
    farmerLeft: 'farmer/farmer_left.png',
    farmerRight: 'farmer/farmer_right.png',
    farmerWaterFront: 'farmer/farmer_water_front.png',
    farmerWaterBack: 'farmer/farmer_water_back.png',
    farmerWaterLeft: 'farmer/farmer_water_left.png',
    farmerWaterRight: 'farmer/farmer_water_right.png',
    environmentFenceHorizontal: 'environment/fenceH.png',
    environmentFenceLeft: 'environment/fenceL.png',
    environmentFenceRight: 'environment/fenceR.png',
    environmentTruckCapital: 'environment/truckCapital.png',
    environmentTruckFairTrade: 'environment/truckFairTrade.png',
    environmentRoad: 'environment/road.png',
    textureGrass: 'textures/grass_2.png',
    textureDirt: 'textures/ground_2.png',
    textureWetDirt: 'textures/watered_ground_2.png',
    textureWood: 'textures/wood.png',
    npc1: 'npcs/farmer_npc1.png',
    npc2: 'npcs/farmer_npc2.png',
    npc3: 'npcs/farmer_npc3.png',
    interfaceCoffeeBean: 'interface/coffeeBean.png',
    interfaceCoin: 'interface/coin.png',
};


/***/ }),

/***/ "./src/controller.ts":
/*!***************************!*\
  !*** ./src/controller.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Controller = void 0;
var Controller = /** @class */ (function () {
    function Controller() {
        var _this = this;
        this.keyWDown = false;
        this.keyADown = false;
        this.keySDown = false;
        this.keyDDown = false;
        this.keyEPressed = false;
        this.onKeyDown = function (event) {
            switch (event.key) {
                case 'w':
                    _this.keyWDown = true;
                    break;
                case 'a':
                    _this.keyADown = true;
                    break;
                case 's':
                    _this.keySDown = true;
                    break;
                case 'd':
                    _this.keyDDown = true;
                    break;
            }
        };
        this.onKeyUp = function (event) {
            switch (event.key) {
                case 'w':
                    _this.keyWDown = false;
                    break;
                case 'a':
                    _this.keyADown = false;
                    break;
                case 's':
                    _this.keySDown = false;
                    break;
                case 'd':
                    _this.keyDDown = false;
                    break;
                case 'e':
                    _this.keyEPressed = true;
                    break;
            }
        };
        this.onMouseUp = function (_) {
            _this.keyEPressed = true;
        };
        document.addEventListener('keydown', this.onKeyDown);
        document.addEventListener('keyup', this.onKeyUp);
        document.addEventListener('mouseup', this.onMouseUp);
    }
    Controller.prototype.getMovement = function () {
        var dx = 0;
        var dy = 0;
        if (this.keyWDown)
            dy -= 1;
        if (this.keySDown)
            dy += 1;
        if (this.keyADown)
            dx -= 1;
        if (this.keyDDown)
            dx += 1;
        return { dx: dx, dy: dy };
    };
    Controller.prototype.getInteract = function () {
        if (this.keyEPressed) {
            this.keyEPressed = false;
            return true;
        }
        return false;
    };
    return Controller;
}());
exports.Controller = Controller;


/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Game = void 0;
var constants_1 = __webpack_require__(/*! ./constants */ "./src/constants.ts");
;
var CoffeePlant = /** @class */ (function () {
    function CoffeePlant(game, object, dirt) {
        this.game = game;
        this.object = object;
        this.dirt = dirt;
        this.state = 'unharvested';
        this.location = {
            x: object.location.x - 0.5,
            y: object.location.y,
        };
        this.width = 2;
        this.height = 1;
    }
    CoffeePlant.prototype.onInteract = function () {
        switch (this.state) {
            case 'unharvested':
                this.state = 'harvested';
                this.game.numHarvestedCoffee++;
                this.object.image = constants_1.IMAGE_NAMES.coffeePlant;
                this.game.startPlayerShaking();
                break;
            case 'harvested':
                this.state = 'watered';
                this.dirt.image = constants_1.IMAGE_NAMES.textureWetDirt;
                this.game.player.isWatering = true;
                this.game.startPlayerShaking();
                break;
            case 'watered':
                break;
        }
    };
    return CoffeePlant;
}());
var CoffeeRack = /** @class */ (function () {
    function CoffeeRack(game, object) {
        this.game = game;
        this.object = object;
        this.state = 'empty';
        this.location = {
            x: object.location.x - 0.5,
            y: object.location.y - 0.5,
        };
        this.width = 2;
        this.height = 2;
    }
    CoffeeRack.prototype.onInteract = function () {
        switch (this.state) {
            case 'empty':
                if (this.game.numHarvestedCoffee >= 4) {
                    this.game.numHarvestedCoffee -= 4;
                    this.state = 'drying';
                    this.object.image = constants_1.IMAGE_NAMES.coffeeRackDrying;
                    this.game.startPlayerShaking();
                }
                break;
            case 'drying':
                break;
            case 'dried':
                this.game.numDriedCoffee += 4;
                this.state = 'empty';
                this.object.image = constants_1.IMAGE_NAMES.coffeeRack;
                this.game.startPlayerShaking();
                break;
        }
    };
    return CoffeeRack;
}());
var House = /** @class */ (function () {
    function House(game, object) {
        this.game = game;
        this.location = {
            x: object.location.x + 1.5,
            y: object.location.y + 1.5,
        };
        this.width = 1.5;
        this.height = 1;
    }
    House.prototype.onInteract = function () {
        this.game.pause = true;
        if (confirm("End your day?")) {
            this.game.endDay();
        }
        else {
            this.game.pause = false;
        }
    };
    return House;
}());
var NPC = /** @class */ (function () {
    function NPC(game, object, dialogues) {
        this.game = game;
        this.dialogues = dialogues;
        this.location = {
            x: object.location.x - 0.5,
            y: object.location.y - 0.5,
        };
        this.width = 2;
        this.height = 2;
    }
    NPC.prototype.onInteract = function () {
        if (this.game.isFairTrade) {
            this.game.dialogues = __spreadArrays(this.dialogues.fairTrade);
        }
        else {
            this.game.dialogues = __spreadArrays(this.dialogues.nonFairTrade);
        }
    };
    return NPC;
}());
var Truck = /** @class */ (function () {
    function Truck(game, object) {
        this.game = game;
        this.location = {
            x: object.location.x - 0.5,
            y: object.location.y - 0.5,
        };
        this.width = 7;
        this.height = 4;
    }
    Truck.prototype.onInteract = function () {
        if (this.game.numDriedCoffee >= 1) {
            if (this.game.isFairTrade) {
                var profit = this.game.numDriedCoffee * 1;
                this.game.money += profit;
                this.game.dialogues = ["Woaw! You sold some coffee beans for $" + profit + ".", "In addition to $10 minimum wage per day!"];
            }
            else {
                var profit = this.game.numDriedCoffee * 0.25;
                this.game.money += profit;
                this.game.dialogues = ["Hmm... You sold some coffee beans for $" + profit + "."];
            }
            this.game.numDriedCoffee = 0;
        }
        else {
            this.game.dialogues = ["Oops... You don't have any dried coffee beans to sell."];
        }
    };
    return Truck;
}());
var Game = /** @class */ (function () {
    function Game() {
        this.player = {
            location: {
                x: 25,
                y: 5,
            },
            facingDirection: 'front',
            isWatering: false,
        };
        this.numHarvestedCoffee = 0;
        this.numDriedCoffee = 0;
        this.isFairTrade = false;
        this.money = 3;
        this.day = 1;
        this.dialogues = ["You live the life of a member in a small coffee farm.", "You and your team are failing to compete with larger plantations and have difficulty improving your lifestyle/farm,", "since your customers are limited to locals and few traders will buy your product at market price.", "What is going to happen to you?"];
        this.pause = false;
        this.populateGameObjectsArray();
    }
    // Check if the movement is legal
    Game.prototype.illegalStep = function (target) {
        var target_x = target.x + 0.5;
        var target_y = target.y + 0.5;
        for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj.collision === undefined) {
                continue;
            }
            var collision_x0 = obj.collision.x0;
            var collision_y0 = obj.collision.y0;
            var collision_x1 = obj.collision.x0 + obj.collision.width;
            var collision_y1 = obj.collision.y0 + obj.collision.height;
            if (target_x >= collision_x0 &&
                target_x <= collision_x1 &&
                target_y >= collision_y0 &&
                target_y <= collision_y1) {
                return true;
            }
        }
        return false;
    };
    /// Process player movement
    Game.prototype.process = function (movement, interact) {
        if (this.darkOverlay !== undefined) {
            this.darkOverlay -= 0.02;
            if (this.darkOverlay < 0) {
                this.darkOverlay = undefined;
            }
            return;
        }
        if (this.pause)
            return;
        if (this.dialogues.length > 0) {
            if (interact) {
                this.dialogues.splice(0, 1);
            }
            return;
        }
        if (this.player.shakeAnimation !== undefined) {
            this.player.shakeAnimation += 0.2 * Math.PI;
            if (this.player.shakeAnimation > 6 * Math.PI) {
                this.player.shakeAnimation = undefined;
                this.player.isWatering = false;
            }
        }
        else if (interact) {
            var playerCenterX = this.player.location.x + 0.5;
            var playerCenterY = this.player.location.y + 0.5;
            for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
                var obj = _a[_i];
                if (obj.interaction !== undefined) {
                    var interaction = obj.interaction;
                    if (interaction.location.x <= playerCenterX &&
                        playerCenterX <= interaction.location.x + interaction.width &&
                        interaction.location.y <= playerCenterY &&
                        playerCenterY <= interaction.location.y + interaction.height) {
                        interaction.onInteract();
                        break;
                    }
                }
            }
        }
        else {
            // Move
            var dx = movement.dx, dy = movement.dy;
            if (dx === 1 && dy === 0 || dx === 1 && this.player.facingDirection === 'right') {
                this.player.facingDirection = 'right';
            }
            else if (dx === -1 && dy === 0 || dx === -1 && this.player.facingDirection === 'left') {
                this.player.facingDirection = 'left';
            }
            else if (dx === 0 && dy === 1 || dy === 1 && this.player.facingDirection === 'front') {
                this.player.facingDirection = 'front';
            }
            else if (dx === 0 && dy === -1 || dy === -1 && this.player.facingDirection === 'back') {
                this.player.facingDirection = 'back';
            }
            if (Math.abs(dx) !== 0 && Math.abs(dy) !== 0) {
                dx /= Math.SQRT2;
                dy /= Math.SQRT2;
            }
            var next = {
                x: this.player.location.x + dx * constants_1.PLAYER_SPEED,
                y: this.player.location.y + dy * constants_1.PLAYER_SPEED,
            };
            if (!this.illegalStep(next)) {
                // console.log("Move");
                this.player.location.x = next.x;
                this.player.location.y = next.y;
            }
            else {
                console.log("Illegal step!");
            }
        }
    };
    Game.prototype.startPlayerShaking = function () {
        this.player.shakeAnimation = 0;
    };
    Game.prototype.endDay = function () {
        var _this = this;
        if (this.isFairTrade) {
            this.money += 10;
        }
        document.getElementById('canvas').hidden = true;
        document.getElementById('end-of-day').hidden = false;
        document.getElementById('bg').hidden = false;
        document.getElementById('balance-label').innerText = "Balance: $" + this.money;
        document.getElementById('nextday').onclick = function () {
            var cost = 0;
            if (document.getElementById('food').checked) {
                cost += 1;
            }
            if (document.getElementById('housing').checked) {
                cost += 2;
            }
            if (document.getElementById('improvements').checked) {
                cost += 100;
            }
            if (document.getElementById('education').checked) {
                cost += 125;
            }
            if (cost > _this.money) {
                alert("Not enough fund.");
            }
            else {
                _this.money -= cost;
                document.getElementById('canvas').hidden = false;
                document.getElementById('end-of-day').hidden = true;
                document.getElementById('bg').hidden = true;
                _this.nextDay();
            }
        };
    };
    Game.prototype.nextDay = function () {
        var _this = this;
        this.pause = false;
        for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
            var obj = _a[_i];
            if (obj.interaction !== undefined) {
                var interaction = obj.interaction;
                if (interaction instanceof CoffeePlant && interaction.state === 'watered') {
                    interaction.state = 'unharvested';
                    interaction.dirt.image = constants_1.IMAGE_NAMES.textureDirt;
                    obj.image = constants_1.IMAGE_NAMES.coffeePlantBerries;
                }
                else if (interaction instanceof CoffeeRack && interaction.state === 'drying') {
                    interaction.state = 'dried';
                    obj.image = constants_1.IMAGE_NAMES.coffeeRackDried;
                }
            }
        }
        this.day++;
        if (this.day === 3) {
            this.isFairTrade = true;
            this.truck.image = constants_1.IMAGE_NAMES.environmentTruckFairTrade;
            this.dialogues = ["Your farm has partnered with Fairtrade!", "The arrival of Fairtrade means that your farm has access to international markets", "and receives at least the stable minimum price set by Fairtrade,", "along with additional premiums that can go towards farm investments or education."];
        }
        // hack
        this.pause = true;
        setTimeout(function () {
            _this.pause = false;
        }, 100);
        this.darkOverlay = 1.5;
    };
    Game.prototype.populateGameObjectsArray = function () {
        var gameObjects = [];
        // add background tiles (game board 30 x 20)
        // grass
        for (var i = 0; i <= constants_1.MAP_WIDTH; i++) {
            for (var j = 0; j <= constants_1.MAP_HEIGHT; j++) {
                var grass = {
                    location: {
                        x: i,
                        y: j,
                    },
                    width: 1,
                    height: 1,
                    image: constants_1.IMAGE_NAMES.textureGrass
                };
                gameObjects.push(grass);
            }
        }
        // add house
        var houseLocation = {
            x: 20,
            y: 2,
        };
        var house = {
            location: {
                x: houseLocation.x,
                y: houseLocation.y,
            },
            width: 4,
            height: 2,
            image: constants_1.IMAGE_NAMES.house,
            collision: {
                x0: houseLocation.x,
                y0: houseLocation.y,
                width: 4,
                height: 2,
            }
        };
        var housei = new House(this, house);
        house.interaction = housei;
        gameObjects.push(house);
        // add coffee plants and dirt
        for (var i = 4; i <= 8; i += 2) {
            for (var j = 9; j < 17; j++) {
                var dirt = {
                    location: {
                        x: i,
                        y: j,
                    },
                    width: 1,
                    height: 1,
                    image: constants_1.IMAGE_NAMES.textureDirt,
                };
                gameObjects.push(dirt);
                var obj = {
                    location: {
                        x: i,
                        y: j,
                    },
                    width: 1,
                    height: 1,
                    image: constants_1.IMAGE_NAMES.coffeePlantBerries,
                    collision: {
                        x0: i + 0.1,
                        y0: j + 0.25,
                        width: 0.8,
                        height: 0.5,
                    }
                };
                var coffeePlant = new CoffeePlant(this, obj, dirt);
                obj.interaction = coffeePlant;
                gameObjects.push(obj);
            }
        }
        // add coffee bean dryers
        for (var i = 11; i <= 17; i += 3) {
            for (var j = 6; j <= 9; j += 3) {
                var obj = {
                    location: {
                        x: i,
                        y: j,
                    },
                    width: 1,
                    height: 1,
                    image: constants_1.IMAGE_NAMES.coffeeRack,
                    collision: {
                        x0: i + 0.15,
                        y0: j + 0.1,
                        width: 0.7,
                        height: 0.8,
                    }
                };
                var coffeeRack = new CoffeeRack(this, obj);
                obj.interaction = coffeeRack;
                gameObjects.push(obj);
            }
        }
        // add Top/Bottom fences
        var fence;
        for (var i = 0; i < constants_1.MAP_WIDTH - 1; i += 1) {
            var fenceTop = {
                location: {
                    x: i + constants_1.FENCE_OFF_SET,
                    y: constants_1.FENCE_OFF_SET,
                },
                width: 1,
                height: 1,
                image: constants_1.IMAGE_NAMES.environmentFenceHorizontal,
                collision: {
                    x0: i + constants_1.FENCE_OFF_SET,
                    y0: constants_1.FENCE_OFF_SET,
                    width: 1,
                    height: 1,
                }
            };
            var fenceBot = {
                location: {
                    x: i + constants_1.FENCE_OFF_SET,
                    y: constants_1.MAP_HEIGHT - 1 - constants_1.FENCE_OFF_SET,
                },
                width: 1,
                height: 1,
                image: constants_1.IMAGE_NAMES.environmentFenceHorizontal,
                collision: {
                    x0: i + constants_1.FENCE_OFF_SET,
                    y0: constants_1.MAP_HEIGHT - 1 - constants_1.FENCE_OFF_SET,
                    width: 1,
                    height: 1,
                }
            };
            gameObjects.push(fenceTop);
            gameObjects.push(fenceBot);
        }
        // add side fences
        for (var i = 4; i < constants_1.MAP_HEIGHT - 1; i += 1) {
            var fenceLeft = {
                location: {
                    x: constants_1.FENCE_OFF_SET,
                    y: i + constants_1.FENCE_OFF_SET,
                },
                width: 1,
                height: 1,
                image: constants_1.IMAGE_NAMES.environmentFenceLeft,
                collision: {
                    x0: constants_1.FENCE_OFF_SET,
                    y0: i + constants_1.FENCE_OFF_SET,
                    width: 0.2,
                    height: 1,
                }
            };
            gameObjects.push(fenceLeft);
        }
        for (var i = 0; i < constants_1.MAP_HEIGHT - 1; i += 1) {
            var fenceRight = {
                location: {
                    x: constants_1.MAP_WIDTH - 1 - constants_1.FENCE_OFF_SET,
                    y: i + constants_1.FENCE_OFF_SET,
                },
                width: 1,
                height: 1,
                image: constants_1.IMAGE_NAMES.environmentFenceRight,
                collision: {
                    x0: constants_1.MAP_WIDTH - 0.2 - constants_1.FENCE_OFF_SET,
                    y0: i + constants_1.FENCE_OFF_SET,
                    width: 0.2,
                    height: 1,
                }
            };
            gameObjects.push(fenceRight);
        }
        // Placehold air wall
        for (var i = 1; i < 4; i += 1) {
            var fenceLeft = {
                location: {
                    x: constants_1.FENCE_OFF_SET,
                    y: i + constants_1.FENCE_OFF_SET,
                },
                width: 0,
                height: 1,
                image: constants_1.IMAGE_NAMES.environmentFenceLeft,
                collision: {
                    x0: constants_1.FENCE_OFF_SET,
                    y0: i + constants_1.FENCE_OFF_SET,
                    width: 0.2,
                    height: 1,
                }
            };
            gameObjects.push(fenceLeft);
        }
        // add road
        for (var i = 0; i < 18; i += 1) {
            var road = {
                location: {
                    x: i,
                    y: 3.5,
                },
                width: 1,
                height: 1,
                image: constants_1.IMAGE_NAMES.environmentRoad,
            };
            gameObjects.push(road);
        }
        // add truck
        var truck = {
            location: {
                x: 10,
                y: 1.2,
            },
            width: 6,
            height: 3,
            image: constants_1.IMAGE_NAMES.environmentTruckCapital,
            collision: {
                x0: 10,
                y0: 2.2,
                width: 5.5,
                height: 2,
            }
        };
        this.truck = truck;
        var trucki = new Truck(this, truck);
        truck.interaction = trucki;
        gameObjects.push(truck);
        // add npcs
        var npc1 = {
            location: {
                x: 9,
                y: 11,
            },
            width: 1,
            height: 1,
            image: constants_1.IMAGE_NAMES.npc1,
            collision: {
                x0: 9.25,
                y0: 11.25,
                width: 0.5,
                height: 0.5,
            }
        };
        var npc1i = new NPC(this, npc1, {
            fairTrade: ["With Fairtrade’s bonus premiums,", "we can finally start investing back into our farm and in our children’s educations!"],
            nonFairTrade: ["Another day of barely scraping by.", "It’s impossible to save money under these conditions..."],
        });
        npc1.interaction = npc1i;
        gameObjects.push(npc1);
        var npc2 = {
            location: {
                x: 10,
                y: 6,
            },
            width: 1,
            height: 1,
            image: constants_1.IMAGE_NAMES.npc2,
            collision: {
                x0: 10.25,
                y0: 6.25,
                width: 0.5,
                height: 0.5,
            }
        };
        var npc2i = new NPC(this, npc2, {
            fairTrade: ["I’m really glad Fairtrade has a minimum buy price safety net for us.", "And when the market price jumps higher, we get that, too!"],
            nonFairTrade: ["I hope the price of coffee doesn’t drop too much...", "I barely made it through the last recession."],
        });
        npc2.interaction = npc2i;
        gameObjects.push(npc2);
        var npc3 = {
            location: {
                x: 8,
                y: 3,
            },
            width: 1,
            height: 1,
            image: constants_1.IMAGE_NAMES.npc3,
            collision: {
                x0: 8.25,
                y0: 3.25,
                width: 0.5,
                height: 0.5,
            }
        };
        var npc3i = new NPC(this, npc3, {
            fairTrade: ["It feels good to have access to international markets through Fairtrade’s help.", "I finally feel that my job is making a difference of sorts."],
            nonFairTrade: ["I heard people outside of our country pay good money for coffee beans.", "We could never sell for that much here."],
        });
        npc3.interaction = npc3i;
        gameObjects.push(npc3);
        //         NPCs being sad
        // -	“Another day of barely scraping by. It’s impossible to save money under these conditions…”
        // -	“I hope the price of coffee doesn’t drop too much… I barely made it through the last recession.”
        // -	“I heard people outside of our country pay good money for coffee beans. We could never sell for that much here.”
        // NPCs being happy
        // -	“With Fairtrade’s bonus premiums, we can finally start investing back into our farm and in our children’s educations!”
        // -	“I’m really glad Fairtrade has a minimum buy price safety net for us. And when the market price jumps higher, we get that, too!”
        // -	“It feels good to have access to international markets through Fairtrade’s help. I finally feel that my job is making a difference of sorts.”
        // -	“Every month we get to vote on what to invest our profits in. I can’t wait to see our town grow!”
        this.gameObjects = gameObjects;
    };
    return Game;
}());
exports.Game = Game;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
var constants_1 = __webpack_require__(/*! ./constants */ "./src/constants.ts");
var controller_1 = __webpack_require__(/*! ./controller */ "./src/controller.ts");
var game_1 = __webpack_require__(/*! ./game */ "./src/game.ts");
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;
var game = new game_1.Game();
var controller = new controller_1.Controller();
function render() {
    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Adjust canvas width/height
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Move player
    var movement = controller.getMovement();
    var interact = controller.getInteract();
    game.process(movement, interact);
    var playerPosition = calculatePlayerPosition(game.player.location);
    /// Utility function to calculate the position on canvas
    function calculatePosition(gridLocation) {
        return calculateObjectPosition(gridLocation, game.player.location, playerPosition);
    }
    // Draw grid lines
    context.strokeStyle = 'grey';
    for (var i = 0; i <= constants_1.MAP_WIDTH; i++) {
        context.beginPath();
        var from = calculatePosition({ x: i, y: 0 });
        var to = calculatePosition({ x: i, y: constants_1.MAP_HEIGHT });
        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
        context.stroke();
    }
    for (var j = 0; j <= constants_1.MAP_HEIGHT; j++) {
        context.beginPath();
        var from = calculatePosition({ x: 0, y: j });
        var to = calculatePosition({ x: constants_1.MAP_WIDTH, y: j });
        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
        context.stroke();
    }
    // Draw game objects
    // TODO: get these objects from game
    // const gameObjects: GameObject[] =
    for (var _i = 0, _a = game.gameObjects; _i < _a.length; _i++) {
        var obj = _a[_i];
        // TODO: remove this later
        if (obj.image === '') {
            continue;
        }
        var _b = calculatePosition(obj.location), x = _b.x, y = _b.y;
        var _c = calculatePosition({
            x: obj.location.x + obj.width,
            y: obj.location.y + obj.height,
        }), maxX = _c.x, maxY = _c.y;
        // Check that image is inside canvas
        if ((x > canvas.width || maxX < 0) && (y > canvas.height && maxY < 0)) {
            continue;
        }
        var image = images[obj.image];
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
    var imageName;
    if (!game.player.isWatering) {
        switch (game.player.facingDirection) {
            case 'front':
                imageName = constants_1.IMAGE_NAMES.farmerFront;
                break;
            case 'back':
                imageName = constants_1.IMAGE_NAMES.farmerBack;
                break;
            case 'left':
                imageName = constants_1.IMAGE_NAMES.farmerLeft;
                break;
            case 'right':
                imageName = constants_1.IMAGE_NAMES.farmerRight;
                break;
        }
    }
    else {
        switch (game.player.facingDirection) {
            case 'front':
                imageName = constants_1.IMAGE_NAMES.farmerWaterFront;
                break;
            case 'back':
                imageName = constants_1.IMAGE_NAMES.farmerWaterBack;
                break;
            case 'left':
                imageName = constants_1.IMAGE_NAMES.farmerWaterLeft;
                break;
            case 'right':
                imageName = constants_1.IMAGE_NAMES.farmerWaterRight;
                break;
        }
    }
    context.imageSmoothingEnabled = false;
    if (game.player.shakeAnimation === undefined) {
        context.drawImage(images[imageName], playerPosition.x, playerPosition.y, constants_1.GRID_WIDTH, constants_1.GRID_WIDTH);
    }
    else {
        context.drawImage(images[imageName], playerPosition.x, playerPosition.y + constants_1.GRID_WIDTH * 0.03 * Math.sin(game.player.shakeAnimation), constants_1.GRID_WIDTH, constants_1.GRID_WIDTH);
    }
    if (game.dialogues.length > 0) {
        var margin = 30;
        var startY = 0.8 * canvas.height;
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
}
/// Calculate the player's current position on the canvas, from the grid location
function calculatePlayerPosition(playerLocation) {
    var up = playerLocation.y * constants_1.GRID_WIDTH;
    var down = (constants_1.MAP_HEIGHT - playerLocation.y) * constants_1.GRID_WIDTH;
    var left = playerLocation.x * constants_1.GRID_WIDTH;
    var right = (constants_1.MAP_WIDTH - playerLocation.x) * constants_1.GRID_WIDTH;
    var halfWidth = canvas.width / 2;
    var halfHeight = canvas.height / 2;
    var x;
    var y;
    if (left < halfWidth) {
        x = left;
    }
    else if (right < halfWidth) {
        x = canvas.width - right;
    }
    else {
        x = halfWidth;
    }
    if (up < halfHeight) {
        y = up;
    }
    else if (down < halfHeight) {
        y = canvas.height - down;
    }
    else {
        y = halfHeight;
    }
    return { x: x, y: y };
}
/// Calculate the position in the canvas of a given point
function calculateObjectPosition(gridLocation, playerGridLocation, playerPosition) {
    return {
        x: playerPosition.x + constants_1.GRID_WIDTH * (gridLocation.x - playerGridLocation.x),
        y: playerPosition.y + constants_1.GRID_WIDTH * (gridLocation.y - playerGridLocation.y),
    };
}
var images = {};
function loadImages(callback) {
    Promise.all(Object.values(constants_1.IMAGE_NAMES)
        .map(function (imageName) { return new Promise(function (resolve, _) {
        var image = new Image();
        image.src = "assets/" + imageName;
        images[imageName] = image;
        image.onload = function () { return resolve(true); };
    }); }))
        .then(function () { return callback(); });
}
loadImages(function () { return setInterval(render, 1000 / constants_1.FPS); });

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mYWlyLXRyYWRlLXNpbXVsYXRvci8uL3NyYy9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vZmFpci10cmFkZS1zaW11bGF0b3IvLi9zcmMvY29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9mYWlyLXRyYWRlLXNpbXVsYXRvci8uL3NyYy9nYW1lLnRzIiwid2VicGFjazovL2ZhaXItdHJhZGUtc2ltdWxhdG9yL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2ZhaXItdHJhZGUtc2ltdWxhdG9yLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBYSxXQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ1QsbUJBQVcsR0FBRyxFQUFFLENBQUM7QUFDakIsb0JBQVksR0FBRyxJQUFJLENBQUM7QUFDcEIsaUJBQVMsR0FBRyxFQUFFLENBQUM7QUFDZixrQkFBVSxHQUFHLEVBQUUsQ0FBQztBQUNoQixrQkFBVSxHQUFHLEdBQUcsQ0FBQztBQUNqQixxQkFBYSxHQUFHLEdBQUcsQ0FBQztBQUNwQixzQkFBYyxHQUFHLEVBQUUsQ0FBQztBQUVqQyx1QkFBdUI7QUFDVixtQkFBVyxHQUFHO0lBQ3ZCLEtBQUssRUFBRSxXQUFXO0lBQ2xCLFdBQVcsRUFBRSx5QkFBeUI7SUFDdEMsa0JBQWtCLEVBQUUsaUNBQWlDO0lBQ3JELFVBQVUsRUFBRSx3QkFBd0I7SUFDcEMsZ0JBQWdCLEVBQUUsK0JBQStCO0lBQ2pELGVBQWUsRUFBRSw4QkFBOEI7SUFDL0MsV0FBVyxFQUFFLHlCQUF5QjtJQUN0QyxVQUFVLEVBQUUsd0JBQXdCO0lBQ3BDLFVBQVUsRUFBRSx3QkFBd0I7SUFDcEMsV0FBVyxFQUFFLHlCQUF5QjtJQUN0QyxnQkFBZ0IsRUFBRSwrQkFBK0I7SUFDakQsZUFBZSxFQUFFLDhCQUE4QjtJQUMvQyxlQUFlLEVBQUUsOEJBQThCO0lBQy9DLGdCQUFnQixFQUFFLCtCQUErQjtJQUNqRCwwQkFBMEIsRUFBRSx3QkFBd0I7SUFDcEQsb0JBQW9CLEVBQUUsd0JBQXdCO0lBQzlDLHFCQUFxQixFQUFFLHdCQUF3QjtJQUMvQyx1QkFBdUIsRUFBRSw4QkFBOEI7SUFDdkQseUJBQXlCLEVBQUUsZ0NBQWdDO0lBQzNELGVBQWUsRUFBRSxzQkFBc0I7SUFDdkMsWUFBWSxFQUFFLHNCQUFzQjtJQUNwQyxXQUFXLEVBQUUsdUJBQXVCO0lBQ3BDLGNBQWMsRUFBRSwrQkFBK0I7SUFDL0MsV0FBVyxFQUFFLG1CQUFtQjtJQUNoQyxJQUFJLEVBQUUsc0JBQXNCO0lBQzVCLElBQUksRUFBRSxzQkFBc0I7SUFDNUIsSUFBSSxFQUFFLHNCQUFzQjtJQUM1QixtQkFBbUIsRUFBRSwwQkFBMEI7SUFDL0MsYUFBYSxFQUFFLG9CQUFvQjtDQUN0QyxDQUFDOzs7Ozs7Ozs7Ozs7OztBQ3RDRjtJQVFJO1FBQUEsaUJBSUM7UUFYTyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRWpCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBMkI1QixjQUFTLEdBQUcsVUFBQyxLQUFvQjtZQUM3QixRQUFRLEtBQUssQ0FBQyxHQUFHLEVBQUU7Z0JBQ2YsS0FBSyxHQUFHO29CQUNKLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO29CQUNyQixNQUFNO2dCQUNWLEtBQUssR0FBRztvQkFDSixLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztvQkFDckIsTUFBTTtnQkFDVixLQUFLLEdBQUc7b0JBQ0osS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7b0JBQ3JCLE1BQU07Z0JBQ1YsS0FBSyxHQUFHO29CQUNKLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO29CQUNyQixNQUFNO2FBQ2I7UUFDTCxDQUFDO1FBRUQsWUFBTyxHQUFHLFVBQUMsS0FBb0I7WUFDM0IsUUFBUSxLQUFLLENBQUMsR0FBRyxFQUFFO2dCQUNmLEtBQUssR0FBRztvQkFDSixLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztvQkFDdEIsTUFBTTtnQkFDVixLQUFLLEdBQUc7b0JBQ0osS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7b0JBQ3RCLE1BQU07Z0JBQ1YsS0FBSyxHQUFHO29CQUNKLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO29CQUN0QixNQUFNO2dCQUNWLEtBQUssR0FBRztvQkFDSixLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztvQkFDdEIsTUFBTTtnQkFDVixLQUFLLEdBQUc7b0JBQ0osS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7b0JBQ3hCLE1BQU07YUFDYjtRQUNMLENBQUM7UUFFRCxjQUFTLEdBQUcsVUFBQyxDQUFhO1lBQ3RCLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQzVCLENBQUM7UUEvREcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hELENBQUM7SUFFTSxnQ0FBVyxHQUFsQjtRQUNJLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksSUFBSSxDQUFDLFFBQVE7WUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNCLElBQUksSUFBSSxDQUFDLFFBQVE7WUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNCLElBQUksSUFBSSxDQUFDLFFBQVE7WUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNCLElBQUksSUFBSSxDQUFDLFFBQVE7WUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTNCLE9BQU8sRUFBRSxFQUFFLE1BQUUsRUFBRSxNQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVNLGdDQUFXLEdBQWxCO1FBQ0ksSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBMENMLGlCQUFDO0FBQUQsQ0FBQztBQXpFWSxnQ0FBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRnZCLCtFQUErRztBQStCOUcsQ0FBQztBQVdGO0lBTUkscUJBQW9CLElBQVUsRUFBVSxNQUFrQixFQUFTLElBQWdCO1FBQS9ELFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUMvRSxJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztRQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHO1lBQ1osQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUc7WUFDMUIsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN2QjtRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVELGdDQUFVLEdBQVY7UUFDSSxRQUFRLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDaEIsS0FBSyxhQUFhO2dCQUNkLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO2dCQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLHVCQUFXLENBQUMsV0FBVyxDQUFDO2dCQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBQy9CLE1BQU07WUFDVixLQUFLLFdBQVc7Z0JBQ1osSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLHVCQUFXLENBQUMsY0FBYyxDQUFDO2dCQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO2dCQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBQy9CLE1BQU07WUFDVixLQUFLLFNBQVM7Z0JBQ1YsTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FBQztBQUVEO0lBTUksb0JBQW9CLElBQVUsRUFBVSxNQUFrQjtRQUF0QyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQUN0RCxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHO1lBQ1osQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUc7WUFDMUIsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUc7U0FDN0I7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFRCwrQkFBVSxHQUFWO1FBQ0ksUUFBUSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2hCLEtBQUssT0FBTztnQkFDUixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLElBQUksQ0FBQyxFQUFFO29CQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixJQUFJLENBQUMsQ0FBQztvQkFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7b0JBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLHVCQUFXLENBQUMsZ0JBQWdCLENBQUM7b0JBQ2pELElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztpQkFDbEM7Z0JBQ0QsTUFBTTtZQUNWLEtBQUssUUFBUTtnQkFDVCxNQUFNO1lBQ1YsS0FBSyxPQUFPO2dCQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLHVCQUFXLENBQUMsVUFBVSxDQUFDO2dCQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBQy9CLE1BQU07U0FDYjtJQUNMLENBQUM7SUFDTCxpQkFBQztBQUFELENBQUM7QUFFRDtJQUtJLGVBQW9CLElBQVUsRUFBRSxNQUFrQjtRQUE5QixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUc7WUFDWixDQUFDLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRztZQUMxQixDQUFDLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRztTQUM3QjtRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFRCwwQkFBVSxHQUFWO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksT0FBTyxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDdEI7YUFBTTtZQUNILElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUMzQjtJQUNMLENBQUM7SUFDTCxZQUFDO0FBQUQsQ0FBQztBQUVEO0lBS0ksYUFBb0IsSUFBVSxFQUFFLE1BQWtCLEVBQVUsU0FBeUQ7UUFBakcsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUE4QixjQUFTLEdBQVQsU0FBUyxDQUFnRDtRQUNqSCxJQUFJLENBQUMsUUFBUSxHQUFHO1lBQ1osQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUc7WUFDMUIsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUc7U0FDN0I7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFRCx3QkFBVSxHQUFWO1FBQ0ksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsa0JBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN2RDthQUFNO1lBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLGtCQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDMUQ7SUFDTCxDQUFDO0lBQ0wsVUFBQztBQUFELENBQUM7QUFFRDtJQUtJLGVBQW9CLElBQVUsRUFBRSxNQUFrQjtRQUE5QixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUc7WUFDWixDQUFDLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRztZQUMxQixDQUFDLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRztTQUM3QjtRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVELDBCQUFVLEdBQVY7UUFDSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsRUFBRTtZQUMvQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUN2QixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUM7Z0JBQzVDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQztnQkFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQywyQ0FBeUMsTUFBTSxNQUFHLEVBQUUsMENBQTBDLENBQUMsQ0FBQzthQUMxSDtpQkFBTTtnQkFDSCxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQztnQkFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyw0Q0FBMEMsTUFBTSxNQUFHLENBQUMsQ0FBQzthQUMvRTtZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztTQUNoQzthQUFNO1lBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyx3REFBd0QsQ0FBQztTQUNuRjtJQUNMLENBQUM7SUFDTCxZQUFDO0FBQUQsQ0FBQztBQUVEO0lBeUJJO1FBeEJPLFdBQU0sR0FBVztZQUNwQixRQUFRLEVBQUU7Z0JBQ04sQ0FBQyxFQUFFLEVBQUU7Z0JBQ0wsQ0FBQyxFQUFFLENBQUM7YUFDUDtZQUNELGVBQWUsRUFBRSxPQUFPO1lBQ3hCLFVBQVUsRUFBRSxLQUFLO1NBQ3BCLENBQUM7UUFDSyx1QkFBa0IsR0FBVyxDQUFDLENBQUM7UUFDL0IsbUJBQWMsR0FBVyxDQUFDLENBQUM7UUFDM0IsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFDN0IsVUFBSyxHQUFXLENBQUMsQ0FBQztRQUNsQixRQUFHLEdBQVcsQ0FBQyxDQUFDO1FBSWhCLGNBQVMsR0FBYSxDQUFDLHVEQUF1RCxFQUFFLHFIQUFxSCxFQUFFLG1HQUFtRyxFQUFFLGlDQUFpQyxDQUFDLENBQUM7UUFFL1UsVUFBSyxHQUFZLEtBQUssQ0FBQztRQU8xQixJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRUQsaUNBQWlDO0lBQzFCLDBCQUFXLEdBQWxCLFVBQW1CLE1BQWE7UUFDNUIsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDOUIsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDOUIsS0FBZ0IsVUFBZ0IsRUFBaEIsU0FBSSxDQUFDLFdBQVcsRUFBaEIsY0FBZ0IsRUFBaEIsSUFBZ0IsRUFBRTtZQUE3QixJQUFJLEdBQUc7WUFFUixJQUFJLEdBQUcsQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO2dCQUM3QixTQUFTO2FBQ1o7WUFFRCxJQUFJLFlBQVksR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztZQUNwQyxJQUFJLFlBQVksR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztZQUNwQyxJQUFJLFlBQVksR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztZQUMxRCxJQUFJLFlBQVksR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztZQUUzRCxJQUFJLFFBQVEsSUFBSSxZQUFZO2dCQUN4QixRQUFRLElBQUksWUFBWTtnQkFDeEIsUUFBUSxJQUFJLFlBQVk7Z0JBQ3hCLFFBQVEsSUFBSSxZQUFZLEVBQUU7Z0JBQzFCLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7U0FDSjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCwyQkFBMkI7SUFDcEIsc0JBQU8sR0FBZCxVQUFlLFFBQWtCLEVBQUUsUUFBaUI7UUFDaEQsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVMsRUFBRTtZQUNoQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQztZQUN6QixJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxFQUFFO2dCQUN0QixJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQzthQUNoQztZQUNELE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLEtBQUs7WUFBRSxPQUFPO1FBRXZCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzNCLElBQUksUUFBUSxFQUFFO2dCQUNWLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUMvQjtZQUNELE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEtBQUssU0FBUyxFQUFFO1lBQzFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQzVDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2FBQ2xDO1NBRUo7YUFBTSxJQUFJLFFBQVEsRUFBRTtZQUNqQixJQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ25ELElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDbkQsS0FBZ0IsVUFBZ0IsRUFBaEIsU0FBSSxDQUFDLFdBQVcsRUFBaEIsY0FBZ0IsRUFBaEIsSUFBZ0IsRUFBRTtnQkFBN0IsSUFBSSxHQUFHO2dCQUNSLElBQUksR0FBRyxDQUFDLFdBQVcsS0FBSyxTQUFTLEVBQUU7b0JBQy9CLElBQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUM7b0JBQ3BDLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksYUFBYTt3QkFDdkMsYUFBYSxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxLQUFLO3dCQUMzRCxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxhQUFhO3dCQUN2QyxhQUFhLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFDOUQ7d0JBQ0UsV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO3dCQUN6QixNQUFNO3FCQUNUO2lCQUNKO2FBQ0o7U0FFSjthQUFNO1lBQ0gsT0FBTztZQUNELE1BQUUsR0FBUyxRQUFRLEdBQWpCLEVBQUUsRUFBRSxHQUFLLFFBQVEsR0FBYixDQUFjO1lBRTFCLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEtBQUssT0FBTyxFQUFFO2dCQUM3RSxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUM7YUFDekM7aUJBQU0sSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEtBQUssTUFBTSxFQUFFO2dCQUNyRixJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUM7YUFDeEM7aUJBQU0sSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsS0FBSyxPQUFPLEVBQUU7Z0JBQ3BGLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQzthQUN6QztpQkFBTSxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsS0FBSyxNQUFNLEVBQUU7Z0JBQ3JGLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQzthQUN4QztZQUVELElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzFDLEVBQUUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNqQixFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQzthQUNwQjtZQUVELElBQUksSUFBSSxHQUFHO2dCQUNQLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLHdCQUFZO2dCQUM3QyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyx3QkFBWTthQUNoRDtZQUVELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN6Qix1QkFBdUI7Z0JBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNuQztpQkFBTTtnQkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQ2hDO1NBQ0o7SUFDTCxDQUFDO0lBRU0saUNBQWtCLEdBQXpCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTSxxQkFBTSxHQUFiO1FBQUEsaUJBb0NDO1FBbkNHLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNsQixJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztTQUNwQjtRQUNELFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNoRCxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDckQsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBRTdDLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUMsU0FBUyxHQUFHLGVBQWMsSUFBSSxDQUFDLEtBQU8sQ0FBQztRQUVoRixRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sR0FBRztZQUN6QyxJQUFJLElBQUksR0FBRyxDQUFDLENBQUM7WUFDYixJQUFLLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFzQixDQUFDLE9BQU8sRUFBRTtnQkFDL0QsSUFBSSxJQUFJLENBQUMsQ0FBQzthQUNiO1lBQ0QsSUFBSyxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBc0IsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2xFLElBQUksSUFBSSxDQUFDLENBQUM7YUFDYjtZQUNELElBQUssUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQXNCLENBQUMsT0FBTyxFQUFFO2dCQUN2RSxJQUFJLElBQUksR0FBRyxDQUFDO2FBQ2Y7WUFDRCxJQUFLLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFzQixDQUFDLE9BQU8sRUFBRTtnQkFDcEUsSUFBSSxJQUFJLEdBQUcsQ0FBQzthQUNmO1lBQ0QsSUFBSSxJQUFJLEdBQUcsS0FBSSxDQUFDLEtBQUssRUFBRTtnQkFDbkIsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7YUFDN0I7aUJBQU07Z0JBQ0gsS0FBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUM7Z0JBRW5CLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDakQsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNwRCxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBRTVDLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNsQjtRQUNMLENBQUMsQ0FBQztJQUNOLENBQUM7SUFFTSxzQkFBTyxHQUFkO1FBQUEsaUJBK0JDO1FBOUJHLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBRW5CLEtBQWdCLFVBQWdCLEVBQWhCLFNBQUksQ0FBQyxXQUFXLEVBQWhCLGNBQWdCLEVBQWhCLElBQWdCLEVBQUU7WUFBN0IsSUFBSSxHQUFHO1lBQ1IsSUFBSSxHQUFHLENBQUMsV0FBVyxLQUFLLFNBQVMsRUFBRTtnQkFDL0IsSUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLFdBQVcsQ0FBQztnQkFDcEMsSUFBSSxXQUFXLFlBQVksV0FBVyxJQUFJLFdBQVcsQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO29CQUN2RSxXQUFXLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztvQkFDbEMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsdUJBQVcsQ0FBQyxXQUFXLENBQUM7b0JBQ2pELEdBQUcsQ0FBQyxLQUFLLEdBQUcsdUJBQVcsQ0FBQyxrQkFBa0IsQ0FBQztpQkFDOUM7cUJBQU0sSUFBSSxXQUFXLFlBQVksVUFBVSxJQUFJLFdBQVcsQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUFFO29CQUM1RSxXQUFXLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztvQkFDNUIsR0FBRyxDQUFDLEtBQUssR0FBRyx1QkFBVyxDQUFDLGVBQWUsQ0FBQztpQkFDM0M7YUFDSjtTQUNKO1FBRUQsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ1gsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsRUFBRTtZQUNoQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyx1QkFBVyxDQUFDLHlCQUF5QixDQUFDO1lBQ3pELElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyx5Q0FBeUMsRUFBQyxtRkFBbUYsRUFBRSxrRUFBa0UsRUFBRSxtRkFBbUYsQ0FBQyxDQUFDO1NBQzdTO1FBRUQsT0FBTztRQUNQLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLFVBQVUsQ0FBQztZQUNQLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVSLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO0lBQzNCLENBQUM7SUFFTyx1Q0FBd0IsR0FBaEM7UUFDSSxJQUFJLFdBQVcsR0FBc0IsRUFBRSxDQUFDO1FBRXhDLDRDQUE0QztRQUM1QyxRQUFRO1FBQ1IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLHFCQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLHNCQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2xDLElBQUksS0FBSyxHQUFHO29CQUNSLFFBQVEsRUFBRTt3QkFDTixDQUFDLEVBQUUsQ0FBQzt3QkFDSixDQUFDLEVBQUUsQ0FBQztxQkFDUDtvQkFDRCxLQUFLLEVBQUUsQ0FBQztvQkFDUixNQUFNLEVBQUUsQ0FBQztvQkFDVCxLQUFLLEVBQUUsdUJBQVcsQ0FBQyxZQUFZO2lCQUNsQztnQkFDRCxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzNCO1NBQ0o7UUFFRCxZQUFZO1FBQ1osSUFBSSxhQUFhLEdBQUc7WUFDaEIsQ0FBQyxFQUFFLEVBQUU7WUFDTCxDQUFDLEVBQUUsQ0FBQztTQUNQO1FBQ0QsSUFBSSxLQUFLLEdBQWU7WUFDcEIsUUFBUSxFQUFFO2dCQUNOLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQztnQkFDbEIsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO2FBQ3JCO1lBQ0QsS0FBSyxFQUFFLENBQUM7WUFDUixNQUFNLEVBQUUsQ0FBQztZQUNULEtBQUssRUFBRSx1QkFBVyxDQUFDLEtBQUs7WUFDeEIsU0FBUyxFQUFFO2dCQUNQLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztnQkFDbkIsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO2dCQUNuQixLQUFLLEVBQUUsQ0FBQztnQkFDUixNQUFNLEVBQUUsQ0FBQzthQUNaO1NBQ0osQ0FBQztRQUNGLElBQUksTUFBTSxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNwQyxLQUFLLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztRQUMzQixXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXhCLDZCQUE2QjtRQUM3QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDekIsSUFBSSxJQUFJLEdBQUc7b0JBQ1AsUUFBUSxFQUFFO3dCQUNOLENBQUMsRUFBRSxDQUFDO3dCQUNKLENBQUMsRUFBRSxDQUFDO3FCQUNQO29CQUNELEtBQUssRUFBRSxDQUFDO29CQUNSLE1BQU0sRUFBRSxDQUFDO29CQUNULEtBQUssRUFBRSx1QkFBVyxDQUFDLFdBQVc7aUJBQ2pDLENBQUM7Z0JBQ0YsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFdkIsSUFBSSxHQUFHLEdBQWU7b0JBQ2xCLFFBQVEsRUFBRTt3QkFDTixDQUFDLEVBQUUsQ0FBQzt3QkFDSixDQUFDLEVBQUUsQ0FBQztxQkFDUDtvQkFDRCxLQUFLLEVBQUUsQ0FBQztvQkFDUixNQUFNLEVBQUUsQ0FBQztvQkFDVCxLQUFLLEVBQUUsdUJBQVcsQ0FBQyxrQkFBa0I7b0JBQ3JDLFNBQVMsRUFBRTt3QkFDUCxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUc7d0JBQ1gsRUFBRSxFQUFFLENBQUMsR0FBRyxJQUFJO3dCQUNaLEtBQUssRUFBRSxHQUFHO3dCQUNWLE1BQU0sRUFBRSxHQUFHO3FCQUNkO2lCQUNKLENBQUM7Z0JBQ0YsSUFBTSxXQUFXLEdBQUcsSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDckQsR0FBRyxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7Z0JBQzlCLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDekI7U0FDSjtRQUVELHlCQUF5QjtRQUN6QixLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDOUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM1QixJQUFJLEdBQUcsR0FBZTtvQkFDbEIsUUFBUSxFQUFFO3dCQUNOLENBQUMsRUFBRSxDQUFDO3dCQUNKLENBQUMsRUFBRSxDQUFDO3FCQUNQO29CQUNELEtBQUssRUFBRSxDQUFDO29CQUNSLE1BQU0sRUFBRSxDQUFDO29CQUNULEtBQUssRUFBRSx1QkFBVyxDQUFDLFVBQVU7b0JBQzdCLFNBQVMsRUFBRTt3QkFDUCxFQUFFLEVBQUUsQ0FBQyxHQUFHLElBQUk7d0JBQ1osRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHO3dCQUNYLEtBQUssRUFBRSxHQUFHO3dCQUNWLE1BQU0sRUFBRSxHQUFHO3FCQUNkO2lCQUNKLENBQUM7Z0JBQ0YsSUFBTSxVQUFVLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUM3QyxHQUFHLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztnQkFDN0IsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN6QjtTQUNKO1FBRUQsd0JBQXdCO1FBQ3hCLElBQUksS0FBSztRQUNULEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxxQkFBUyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3ZDLElBQUksUUFBUSxHQUFHO2dCQUNYLFFBQVEsRUFBRTtvQkFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHLHlCQUFhO29CQUNwQixDQUFDLEVBQUUseUJBQWE7aUJBQ25CO2dCQUNELEtBQUssRUFBRSxDQUFDO2dCQUNSLE1BQU0sRUFBRSxDQUFDO2dCQUNULEtBQUssRUFBRSx1QkFBVyxDQUFDLDBCQUEwQjtnQkFDN0MsU0FBUyxFQUFFO29CQUNQLEVBQUUsRUFBRSxDQUFDLEdBQUcseUJBQWE7b0JBQ3JCLEVBQUUsRUFBRSx5QkFBYTtvQkFDakIsS0FBSyxFQUFFLENBQUM7b0JBQ1IsTUFBTSxFQUFFLENBQUM7aUJBQ1o7YUFDSjtZQUNELElBQUksUUFBUSxHQUFHO2dCQUNYLFFBQVEsRUFBRTtvQkFDTixDQUFDLEVBQUUsQ0FBQyxHQUFHLHlCQUFhO29CQUNwQixDQUFDLEVBQUUsc0JBQVUsR0FBRyxDQUFDLEdBQUcseUJBQWE7aUJBQ3BDO2dCQUNELEtBQUssRUFBRSxDQUFDO2dCQUNSLE1BQU0sRUFBRSxDQUFDO2dCQUNULEtBQUssRUFBRSx1QkFBVyxDQUFDLDBCQUEwQjtnQkFDN0MsU0FBUyxFQUFFO29CQUNQLEVBQUUsRUFBRSxDQUFDLEdBQUcseUJBQWE7b0JBQ3JCLEVBQUUsRUFBRSxzQkFBVSxHQUFHLENBQUMsR0FBRyx5QkFBYTtvQkFDbEMsS0FBSyxFQUFFLENBQUM7b0JBQ1IsTUFBTSxFQUFFLENBQUM7aUJBQ1o7YUFDSjtZQUNELFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0IsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM5QjtRQUdELGtCQUFrQjtRQUNsQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsc0JBQVUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN4QyxJQUFJLFNBQVMsR0FBRztnQkFDWixRQUFRLEVBQUU7b0JBQ04sQ0FBQyxFQUFFLHlCQUFhO29CQUNoQixDQUFDLEVBQUUsQ0FBQyxHQUFHLHlCQUFhO2lCQUN2QjtnQkFDRCxLQUFLLEVBQUUsQ0FBQztnQkFDUixNQUFNLEVBQUUsQ0FBQztnQkFDVCxLQUFLLEVBQUUsdUJBQVcsQ0FBQyxvQkFBb0I7Z0JBQ3ZDLFNBQVMsRUFBRTtvQkFDUCxFQUFFLEVBQUUseUJBQWE7b0JBQ2pCLEVBQUUsRUFBRSxDQUFDLEdBQUcseUJBQWE7b0JBQ3JCLEtBQUssRUFBRSxHQUFHO29CQUNWLE1BQU0sRUFBRSxDQUFDO2lCQUNaO2FBQ0o7WUFDRCxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQy9CO1FBQ0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLHNCQUFVLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDeEMsSUFBSSxVQUFVLEdBQUc7Z0JBQ2IsUUFBUSxFQUFFO29CQUNOLENBQUMsRUFBRSxxQkFBUyxHQUFHLENBQUMsR0FBRyx5QkFBYTtvQkFDaEMsQ0FBQyxFQUFFLENBQUMsR0FBRyx5QkFBYTtpQkFDdkI7Z0JBQ0QsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsS0FBSyxFQUFFLHVCQUFXLENBQUMscUJBQXFCO2dCQUN4QyxTQUFTLEVBQUU7b0JBQ1AsRUFBRSxFQUFFLHFCQUFTLEdBQUcsR0FBRyxHQUFHLHlCQUFhO29CQUNuQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLHlCQUFhO29CQUNyQixLQUFLLEVBQUUsR0FBRztvQkFDVixNQUFNLEVBQUUsQ0FBQztpQkFDWjthQUNKO1lBQ0QsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNoQztRQUVELHFCQUFxQjtRQUNyQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDM0IsSUFBSSxTQUFTLEdBQUc7Z0JBQ1osUUFBUSxFQUFFO29CQUNOLENBQUMsRUFBRSx5QkFBYTtvQkFDaEIsQ0FBQyxFQUFFLENBQUMsR0FBRyx5QkFBYTtpQkFDdkI7Z0JBQ0QsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsS0FBSyxFQUFFLHVCQUFXLENBQUMsb0JBQW9CO2dCQUN2QyxTQUFTLEVBQUU7b0JBQ1AsRUFBRSxFQUFFLHlCQUFhO29CQUNqQixFQUFFLEVBQUUsQ0FBQyxHQUFHLHlCQUFhO29CQUNyQixLQUFLLEVBQUUsR0FBRztvQkFDVixNQUFNLEVBQUUsQ0FBQztpQkFDWjthQUNKO1lBQ0QsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUMvQjtRQUVELFdBQVc7UUFDWCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUIsSUFBSSxJQUFJLEdBQUc7Z0JBQ1AsUUFBUSxFQUFFO29CQUNOLENBQUMsRUFBRSxDQUFDO29CQUNKLENBQUMsRUFBRSxHQUFHO2lCQUNUO2dCQUNELEtBQUssRUFBRSxDQUFDO2dCQUNSLE1BQU0sRUFBRSxDQUFDO2dCQUNULEtBQUssRUFBRSx1QkFBVyxDQUFDLGVBQWU7YUFDckMsQ0FBQztZQUNGLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDMUI7UUFFRCxZQUFZO1FBQ1osSUFBSSxLQUFLLEdBQWU7WUFDcEIsUUFBUSxFQUFFO2dCQUNOLENBQUMsRUFBRSxFQUFFO2dCQUNMLENBQUMsRUFBRSxHQUFHO2FBQ1Q7WUFDRCxLQUFLLEVBQUUsQ0FBQztZQUNSLE1BQU0sRUFBRSxDQUFDO1lBQ1QsS0FBSyxFQUFFLHVCQUFXLENBQUMsdUJBQXVCO1lBQzFDLFNBQVMsRUFBRTtnQkFDUCxFQUFFLEVBQUUsRUFBRTtnQkFDTixFQUFFLEVBQUUsR0FBRztnQkFDUCxLQUFLLEVBQUUsR0FBRztnQkFDVixNQUFNLEVBQUUsQ0FBQzthQUNaO1NBQ0osQ0FBQztRQUNGLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksTUFBTSxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNwQyxLQUFLLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztRQUMzQixXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXhCLFdBQVc7UUFDWCxJQUFJLElBQUksR0FBZTtZQUNuQixRQUFRLEVBQUU7Z0JBQ04sQ0FBQyxFQUFFLENBQUM7Z0JBQ0osQ0FBQyxFQUFFLEVBQUU7YUFDUjtZQUNELEtBQUssRUFBRSxDQUFDO1lBQ1IsTUFBTSxFQUFFLENBQUM7WUFDVCxLQUFLLEVBQUUsdUJBQVcsQ0FBQyxJQUFJO1lBQ3ZCLFNBQVMsRUFBRTtnQkFDUCxFQUFFLEVBQUUsSUFBSTtnQkFDUixFQUFFLEVBQUUsS0FBSztnQkFDVCxLQUFLLEVBQUUsR0FBRztnQkFDVixNQUFNLEVBQUUsR0FBRzthQUNkO1NBQ0o7UUFDRCxJQUFJLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFO1lBQzVCLFNBQVMsRUFBRSxDQUFDLGtDQUFrQyxFQUFFLHFGQUFxRixDQUFDO1lBQ3RJLFlBQVksRUFBRSxDQUFDLG9DQUFvQyxFQUFFLHlEQUF5RCxDQUFDO1NBQ2xILENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkIsSUFBSSxJQUFJLEdBQWU7WUFDbkIsUUFBUSxFQUFFO2dCQUNOLENBQUMsRUFBRSxFQUFFO2dCQUNMLENBQUMsRUFBRSxDQUFDO2FBQ1A7WUFDRCxLQUFLLEVBQUUsQ0FBQztZQUNSLE1BQU0sRUFBRSxDQUFDO1lBQ1QsS0FBSyxFQUFFLHVCQUFXLENBQUMsSUFBSTtZQUN2QixTQUFTLEVBQUU7Z0JBQ1AsRUFBRSxFQUFFLEtBQUs7Z0JBQ1QsRUFBRSxFQUFFLElBQUk7Z0JBQ1IsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsTUFBTSxFQUFFLEdBQUc7YUFDZDtTQUNKO1FBQ0QsSUFBSSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtZQUM1QixTQUFTLEVBQUUsQ0FBQyxzRUFBc0UsRUFBQywyREFBMkQsQ0FBQztZQUMvSSxZQUFZLEVBQUUsQ0FBQyxxREFBcUQsRUFBRSw4Q0FBOEMsQ0FBQztTQUN4SCxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXZCLElBQUksSUFBSSxHQUFlO1lBQ25CLFFBQVEsRUFBRTtnQkFDTixDQUFDLEVBQUUsQ0FBQztnQkFDSixDQUFDLEVBQUUsQ0FBQzthQUNQO1lBQ0QsS0FBSyxFQUFFLENBQUM7WUFDUixNQUFNLEVBQUUsQ0FBQztZQUNULEtBQUssRUFBRSx1QkFBVyxDQUFDLElBQUk7WUFDdkIsU0FBUyxFQUFFO2dCQUNQLEVBQUUsRUFBRSxJQUFJO2dCQUNSLEVBQUUsRUFBRSxJQUFJO2dCQUNSLEtBQUssRUFBRSxHQUFHO2dCQUNWLE1BQU0sRUFBRSxHQUFHO2FBQ2Q7U0FDSjtRQUNELElBQUksS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUU7WUFDNUIsU0FBUyxFQUFFLENBQUMsaUZBQWlGLEVBQUMsNkRBQTZELENBQUM7WUFDNUosWUFBWSxFQUFFLENBQUMsd0VBQXdFLEVBQUUseUNBQXlDLENBQUM7U0FDdEksQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUvQix5QkFBeUI7UUFDekIsK0ZBQStGO1FBQy9GLHFHQUFxRztRQUNyRyxxSEFBcUg7UUFDckgsbUJBQW1CO1FBQ25CLDJIQUEySDtRQUMzSCxxSUFBcUk7UUFDckksa0pBQWtKO1FBQ2xKLHNHQUFzRztRQUU5RixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUNuQyxDQUFDO0lBQ0wsV0FBQztBQUFELENBQUM7QUF2Z0JZLG9CQUFJOzs7Ozs7O1VDbk1qQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7Ozs7O0FDckJBLCtFQUErRztBQUMvRyxrRkFBMEM7QUFDMUMsZ0VBQWlEO0FBRWpELElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFzQixDQUFDO0FBQ3RFLElBQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFeEMsT0FBTyxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztBQUV0QyxJQUFNLElBQUksR0FBRyxJQUFJLFdBQUksRUFBRSxDQUFDO0FBQ3hCLElBQU0sVUFBVSxHQUFHLElBQUksdUJBQVUsRUFBRSxDQUFDO0FBRXBDLFNBQVMsTUFBTTtJQUNYLGVBQWU7SUFDZixPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFckQsNkJBQTZCO0lBQzdCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUNqQyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFFbkMsY0FBYztJQUNkLElBQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMxQyxJQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFFakMsSUFBTSxjQUFjLEdBQUcsdUJBQXVCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUVyRSx3REFBd0Q7SUFDeEQsU0FBUyxpQkFBaUIsQ0FBQyxZQUFtQjtRQUMxQyxPQUFPLHVCQUF1QixDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBRUQsa0JBQWtCO0lBQ2xCLE9BQU8sQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO0lBRTdCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxxQkFBUyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2pDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNwQixJQUFJLElBQUksR0FBRyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0MsSUFBSSxFQUFFLEdBQUcsaUJBQWlCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxzQkFBVSxFQUFFLENBQUMsQ0FBQztRQUNwRCxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ3BCO0lBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLHNCQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbEMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3BCLElBQUksSUFBSSxHQUFHLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3QyxJQUFJLEVBQUUsR0FBRyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsRUFBRSxxQkFBUyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25ELE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDcEI7SUFFRCxvQkFBb0I7SUFDcEIsb0NBQW9DO0lBQ3BDLG9DQUFvQztJQUVwQyxLQUFnQixVQUFnQixFQUFoQixTQUFJLENBQUMsV0FBVyxFQUFoQixjQUFnQixFQUFoQixJQUFnQixFQUFFO1FBQTdCLElBQUksR0FBRztRQUNSLDBCQUEwQjtRQUMxQixJQUFJLEdBQUcsQ0FBQyxLQUFLLEtBQUssRUFBRSxFQUFFO1lBQ2xCLFNBQVM7U0FDWjtRQUVHLFNBQVcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUF4QyxDQUFDLFNBQUUsQ0FBQyxPQUFvQyxDQUFDO1FBQzNDLFNBQXVCLGlCQUFpQixDQUFDO1lBQ3pDLENBQUMsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSztZQUM3QixDQUFDLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU07U0FDakMsQ0FBQyxFQUhPLElBQUksU0FBSyxJQUFJLE9BR3BCLENBQUM7UUFFSCxvQ0FBb0M7UUFDcEMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNuRSxTQUFTO1NBQ1o7UUFFRCxJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFDdEMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztLQUN0RDtJQUVELHlCQUF5QjtJQUN6QixzQ0FBc0M7SUFDdEMsaUNBQWlDO0lBQ2pDLHlDQUF5QztJQUN6QyxvQkFBb0I7SUFDcEIsUUFBUTtJQUVSLHNGQUFzRjtJQUN0RixxREFBcUQ7SUFDckQscURBQXFEO0lBQ3JELHNEQUFzRDtJQUN0RCxVQUFVO0lBRVYsNkJBQTZCO0lBQzdCLG1DQUFtQztJQUNuQywyQkFBMkI7SUFDM0IsOENBQThDO0lBQzlDLHdCQUF3QjtJQUN4QixJQUFJO0lBRUosY0FBYztJQUNkLElBQUksU0FBUyxDQUFDO0lBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO1FBQ3pCLFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUU7WUFDakMsS0FBSyxPQUFPO2dCQUNSLFNBQVMsR0FBRyx1QkFBVyxDQUFDLFdBQVcsQ0FBQztnQkFDcEMsTUFBTTtZQUNWLEtBQUssTUFBTTtnQkFDUCxTQUFTLEdBQUcsdUJBQVcsQ0FBQyxVQUFVLENBQUM7Z0JBQ25DLE1BQU07WUFDVixLQUFLLE1BQU07Z0JBQ1AsU0FBUyxHQUFHLHVCQUFXLENBQUMsVUFBVSxDQUFDO2dCQUNuQyxNQUFNO1lBQ1YsS0FBSyxPQUFPO2dCQUNSLFNBQVMsR0FBRyx1QkFBVyxDQUFDLFdBQVcsQ0FBQztnQkFDcEMsTUFBTTtTQUNiO0tBQ0o7U0FBTTtRQUNILFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUU7WUFDakMsS0FBSyxPQUFPO2dCQUNSLFNBQVMsR0FBRyx1QkFBVyxDQUFDLGdCQUFnQixDQUFDO2dCQUN6QyxNQUFNO1lBQ1YsS0FBSyxNQUFNO2dCQUNQLFNBQVMsR0FBRyx1QkFBVyxDQUFDLGVBQWUsQ0FBQztnQkFDeEMsTUFBTTtZQUNWLEtBQUssTUFBTTtnQkFDUCxTQUFTLEdBQUcsdUJBQVcsQ0FBQyxlQUFlLENBQUM7Z0JBQ3hDLE1BQU07WUFDVixLQUFLLE9BQU87Z0JBQ1IsU0FBUyxHQUFHLHVCQUFXLENBQUMsZ0JBQWdCLENBQUM7Z0JBQ3pDLE1BQU07U0FDYjtLQUNKO0lBRUQsT0FBTyxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztJQUN0QyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxLQUFLLFNBQVMsRUFBRTtRQUMxQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDLEVBQUUsc0JBQVUsRUFBRSxzQkFBVSxDQUFDLENBQUM7S0FDcEc7U0FBTTtRQUNILE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUMsR0FBRyxzQkFBVSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEVBQUUsc0JBQVUsRUFBRSxzQkFBVSxDQUFDLENBQUM7S0FDL0o7SUFFRCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUMzQixJQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBTSxNQUFNLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDbkMsT0FBTyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7UUFDNUIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQztRQUM3RixPQUFPLENBQUMsV0FBVyxHQUFHLGtCQUFrQixDQUFDO1FBQ3pDLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUM7UUFFL0YsT0FBTyxDQUFDLElBQUksR0FBRyx1QkFBdUIsQ0FBQztRQUN2QyxPQUFPLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztRQUM1QixPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxNQUFNLEdBQUcsQ0FBQyxHQUFHLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztLQUNuRztJQUVELElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxTQUFTLEVBQUU7UUFDaEMsT0FBTyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7UUFDNUIsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN2RDtBQUVMLENBQUM7QUFFRCxpRkFBaUY7QUFDakYsU0FBUyx1QkFBdUIsQ0FBQyxjQUFxQjtJQUNsRCxJQUFJLEVBQUUsR0FBRyxjQUFjLENBQUMsQ0FBQyxHQUFHLHNCQUFVLENBQUM7SUFDdkMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxzQkFBVSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxzQkFBVSxDQUFDO0lBQ3hELElBQUksSUFBSSxHQUFHLGNBQWMsQ0FBQyxDQUFDLEdBQUcsc0JBQVUsQ0FBQztJQUN6QyxJQUFJLEtBQUssR0FBRyxDQUFDLHFCQUFTLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHLHNCQUFVLENBQUM7SUFFeEQsSUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDbkMsSUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFFckMsSUFBSSxDQUFTLENBQUM7SUFDZCxJQUFJLENBQVMsQ0FBQztJQUNkLElBQUksSUFBSSxHQUFHLFNBQVMsRUFBRTtRQUNsQixDQUFDLEdBQUcsSUFBSSxDQUFDO0tBQ1o7U0FBTSxJQUFJLEtBQUssR0FBRyxTQUFTLEVBQUU7UUFDMUIsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0tBQzVCO1NBQU07UUFDSCxDQUFDLEdBQUcsU0FBUyxDQUFDO0tBQ2pCO0lBQ0QsSUFBSSxFQUFFLEdBQUcsVUFBVSxFQUFFO1FBQ2pCLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDVjtTQUFNLElBQUksSUFBSSxHQUFHLFVBQVUsRUFBRTtRQUMxQixDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7S0FDNUI7U0FBTTtRQUNILENBQUMsR0FBRyxVQUFVLENBQUM7S0FDbEI7SUFFRCxPQUFPLEVBQUUsQ0FBQyxLQUFFLENBQUMsS0FBRSxDQUFDO0FBQ3BCLENBQUM7QUFFRCx5REFBeUQ7QUFDekQsU0FBUyx1QkFBdUIsQ0FDNUIsWUFBbUIsRUFDbkIsa0JBQXlCLEVBQ3pCLGNBQXFCO0lBRXJCLE9BQU87UUFDSCxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUMsR0FBRyxzQkFBVSxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7UUFDMUUsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDLEdBQUcsc0JBQVUsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO0tBQzdFLENBQUM7QUFDTixDQUFDO0FBRUQsSUFBSSxNQUFNLEdBQStDLEVBQUUsQ0FBQztBQUU1RCxTQUFTLFVBQVUsQ0FBQyxRQUFvQjtJQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsdUJBQVcsQ0FBQztTQUNqQyxHQUFHLENBQUMsbUJBQVMsSUFBSSxXQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3JDLElBQU0sS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7UUFDMUIsS0FBSyxDQUFDLEdBQUcsR0FBRyxZQUFVLFNBQVcsQ0FBQztRQUNsQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBRTFCLEtBQUssQ0FBQyxNQUFNLEdBQUcsY0FBTSxjQUFPLENBQUMsSUFBSSxDQUFDLEVBQWIsQ0FBYSxDQUFDO0lBQ3ZDLENBQUMsQ0FBQyxFQU5nQixDQU1oQixDQUFDLENBQUM7U0FDSCxJQUFJLENBQUMsY0FBTSxlQUFRLEVBQUUsRUFBVixDQUFVLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBRUQsVUFBVSxDQUFDLGNBQU0sa0JBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxHQUFHLGVBQUcsQ0FBQyxFQUEvQixDQUErQixDQUFDLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IEZQUyA9IDYwO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9TSVpFID0gNjQ7XG5leHBvcnQgY29uc3QgUExBWUVSX1NQRUVEID0gMC4wNjtcbmV4cG9ydCBjb25zdCBNQVBfV0lEVEggPSAzMDtcbmV4cG9ydCBjb25zdCBNQVBfSEVJR0hUID0gMjA7XG5leHBvcnQgY29uc3QgR1JJRF9XSURUSCA9IDEyODtcbmV4cG9ydCBjb25zdCBGRU5DRV9PRkZfU0VUID0gMC41O1xuZXhwb3J0IGNvbnN0IFRPUF9CQVJfSEVJR0hUID0gODA7XG5cbi8vIFRPRE86IGFkZCBhbGwgaW1hZ2VzXG5leHBvcnQgY29uc3QgSU1BR0VfTkFNRVMgPSB7XG4gICAgaG91c2U6ICdob3VzZS5wbmcnLFxuICAgIGNvZmZlZVBsYW50OiAnY29mZmVlL2NvZmZlZV9wbGFudC5wbmcnLFxuICAgIGNvZmZlZVBsYW50QmVycmllczogJ2NvZmZlZS9jb2ZmZWVfcGxhbnRfYmVycmllcy5wbmcnLFxuICAgIGNvZmZlZVJhY2s6ICdjb2ZmZWUvY29mZmVlX3JhY2sucG5nJyxcbiAgICBjb2ZmZWVSYWNrRHJ5aW5nOiAnY29mZmVlL2NvZmZlZV9yYWNrX2RyeWluZy5wbmcnLFxuICAgIGNvZmZlZVJhY2tEcmllZDogJ2NvZmZlZS9jb2ZmZWVfcmFja19kcmllZC5wbmcnLFxuICAgIGZhcm1lckZyb250OiAnZmFybWVyL2Zhcm1lcl9mcm9udC5wbmcnLFxuICAgIGZhcm1lckJhY2s6ICdmYXJtZXIvZmFybWVyX2JhY2sucG5nJyxcbiAgICBmYXJtZXJMZWZ0OiAnZmFybWVyL2Zhcm1lcl9sZWZ0LnBuZycsXG4gICAgZmFybWVyUmlnaHQ6ICdmYXJtZXIvZmFybWVyX3JpZ2h0LnBuZycsXG4gICAgZmFybWVyV2F0ZXJGcm9udDogJ2Zhcm1lci9mYXJtZXJfd2F0ZXJfZnJvbnQucG5nJyxcbiAgICBmYXJtZXJXYXRlckJhY2s6ICdmYXJtZXIvZmFybWVyX3dhdGVyX2JhY2sucG5nJyxcbiAgICBmYXJtZXJXYXRlckxlZnQ6ICdmYXJtZXIvZmFybWVyX3dhdGVyX2xlZnQucG5nJyxcbiAgICBmYXJtZXJXYXRlclJpZ2h0OiAnZmFybWVyL2Zhcm1lcl93YXRlcl9yaWdodC5wbmcnLFxuICAgIGVudmlyb25tZW50RmVuY2VIb3Jpem9udGFsOiAnZW52aXJvbm1lbnQvZmVuY2VILnBuZycsXG4gICAgZW52aXJvbm1lbnRGZW5jZUxlZnQ6ICdlbnZpcm9ubWVudC9mZW5jZUwucG5nJyxcbiAgICBlbnZpcm9ubWVudEZlbmNlUmlnaHQ6ICdlbnZpcm9ubWVudC9mZW5jZVIucG5nJyxcbiAgICBlbnZpcm9ubWVudFRydWNrQ2FwaXRhbDogJ2Vudmlyb25tZW50L3RydWNrQ2FwaXRhbC5wbmcnLFxuICAgIGVudmlyb25tZW50VHJ1Y2tGYWlyVHJhZGU6ICdlbnZpcm9ubWVudC90cnVja0ZhaXJUcmFkZS5wbmcnLFxuICAgIGVudmlyb25tZW50Um9hZDogJ2Vudmlyb25tZW50L3JvYWQucG5nJyxcbiAgICB0ZXh0dXJlR3Jhc3M6ICd0ZXh0dXJlcy9ncmFzc18yLnBuZycsXG4gICAgdGV4dHVyZURpcnQ6ICd0ZXh0dXJlcy9ncm91bmRfMi5wbmcnLFxuICAgIHRleHR1cmVXZXREaXJ0OiAndGV4dHVyZXMvd2F0ZXJlZF9ncm91bmRfMi5wbmcnLFxuICAgIHRleHR1cmVXb29kOiAndGV4dHVyZXMvd29vZC5wbmcnLFxuICAgIG5wYzE6ICducGNzL2Zhcm1lcl9ucGMxLnBuZycsXG4gICAgbnBjMjogJ25wY3MvZmFybWVyX25wYzIucG5nJyxcbiAgICBucGMzOiAnbnBjcy9mYXJtZXJfbnBjMy5wbmcnLFxuICAgIGludGVyZmFjZUNvZmZlZUJlYW46ICdpbnRlcmZhY2UvY29mZmVlQmVhbi5wbmcnLFxuICAgIGludGVyZmFjZUNvaW46ICdpbnRlcmZhY2UvY29pbi5wbmcnLFxufTsiLCJpbXBvcnQgeyBNb3ZlbWVudCB9IGZyb20gJy4vZ2FtZSc7XG5cbmV4cG9ydCBjbGFzcyBDb250cm9sbGVyIHtcbiAgICBwcml2YXRlIGtleVdEb3duID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBrZXlBRG93biA9IGZhbHNlO1xuICAgIHByaXZhdGUga2V5U0Rvd24gPSBmYWxzZTtcbiAgICBwcml2YXRlIGtleUREb3duID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIGtleUVQcmVzc2VkID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlEb3duKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLm9uS2V5VXApO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5vbk1vdXNlVXApXG4gICAgfVxuXG4gICAgcHVibGljIGdldE1vdmVtZW50KCk6IE1vdmVtZW50IHtcbiAgICAgICAgbGV0IGR4ID0gMDtcbiAgICAgICAgbGV0IGR5ID0gMDtcbiAgICAgICAgaWYgKHRoaXMua2V5V0Rvd24pIGR5IC09IDE7XG4gICAgICAgIGlmICh0aGlzLmtleVNEb3duKSBkeSArPSAxO1xuICAgICAgICBpZiAodGhpcy5rZXlBRG93bikgZHggLT0gMTtcbiAgICAgICAgaWYgKHRoaXMua2V5RERvd24pIGR4ICs9IDE7XG5cbiAgICAgICAgcmV0dXJuIHsgZHgsIGR5IH07XG4gICAgfVxuXG4gICAgcHVibGljIGdldEludGVyYWN0KCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5rZXlFUHJlc3NlZCkge1xuICAgICAgICAgICAgdGhpcy5rZXlFUHJlc3NlZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIG9uS2V5RG93biA9IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICAgICAgY2FzZSAndyc6XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlXRG93biA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdhJzpcbiAgICAgICAgICAgICAgICB0aGlzLmtleUFEb3duID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgIHRoaXMua2V5U0Rvd24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZCc6XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlERG93biA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbktleVVwID0gKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgICAgICBjYXNlICd3JzpcbiAgICAgICAgICAgICAgICB0aGlzLmtleVdEb3duID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdhJzpcbiAgICAgICAgICAgICAgICB0aGlzLmtleUFEb3duID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzJzpcbiAgICAgICAgICAgICAgICB0aGlzLmtleVNEb3duID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkJzpcbiAgICAgICAgICAgICAgICB0aGlzLmtleUREb3duID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdlJzpcbiAgICAgICAgICAgICAgICB0aGlzLmtleUVQcmVzc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTW91c2VVcCA9IChfOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMua2V5RVByZXNzZWQgPSB0cnVlO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBHUklEX1dJRFRILCBQTEFZRVJfU1BFRUQsIElNQUdFX05BTUVTLCBNQVBfV0lEVEgsIE1BUF9IRUlHSFQsIEZFTkNFX09GRl9TRVQsIEZQUyB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuXG5leHBvcnQgdHlwZSBQb2ludCA9IHtcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxufTtcblxuZXhwb3J0IHR5cGUgUGxheWVyID0ge1xuICAgIGxvY2F0aW9uOiBQb2ludCxcbiAgICBmYWNpbmdEaXJlY3Rpb246ICdmcm9udCcgfCAnYmFjaycgfCAnbGVmdCcgfCAncmlnaHQnLFxuICAgIHNoYWtlQW5pbWF0aW9uPzogbnVtYmVyLFxuICAgIGlzV2F0ZXJpbmc6IGJvb2xlYW4sXG59O1xuXG5leHBvcnQgdHlwZSBNb3ZlbWVudCA9IHtcbiAgICBkeDogbnVtYmVyLFxuICAgIGR5OiBudW1iZXIsXG59O1xuXG5leHBvcnQgdHlwZSBab25lID0ge1xuICAgIHgwOiBudW1iZXIsXG4gICAgeTA6IG51bWJlcixcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEludGVyYWN0YWJsZSB7XG4gICAgbG9jYXRpb246IFBvaW50LFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgb25JbnRlcmFjdDogKCkgPT4gdm9pZCxcbn07XG5cbmV4cG9ydCB0eXBlIEdhbWVPYmplY3QgPSB7XG4gICAgbG9jYXRpb246IFBvaW50LFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXIsXG4gICAgaW1hZ2U6IHN0cmluZyxcbiAgICBjb2xsaXNpb24/OiBab25lLFxuICAgIGludGVyYWN0aW9uPzogSW50ZXJhY3RhYmxlLFxufTtcblxuY2xhc3MgQ29mZmVlUGxhbnQgaW1wbGVtZW50cyBJbnRlcmFjdGFibGUge1xuICAgIGxvY2F0aW9uOiBQb2ludDtcbiAgICB3aWR0aDogbnVtYmVyO1xuICAgIGhlaWdodDogbnVtYmVyO1xuICAgIHN0YXRlOiAndW5oYXJ2ZXN0ZWQnIHwgJ2hhcnZlc3RlZCcgfCAnd2F0ZXJlZCc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdhbWU6IEdhbWUsIHByaXZhdGUgb2JqZWN0OiBHYW1lT2JqZWN0LCBwdWJsaWMgZGlydDogR2FtZU9iamVjdCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gJ3VuaGFydmVzdGVkJztcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IHtcbiAgICAgICAgICAgIHg6IG9iamVjdC5sb2NhdGlvbi54IC0gMC41LFxuICAgICAgICAgICAgeTogb2JqZWN0LmxvY2F0aW9uLnksXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53aWR0aCA9IDI7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMTtcbiAgICB9XG5cbiAgICBvbkludGVyYWN0KCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3VuaGFydmVzdGVkJzpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gJ2hhcnZlc3RlZCc7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLm51bUhhcnZlc3RlZENvZmZlZSsrO1xuICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0LmltYWdlID0gSU1BR0VfTkFNRVMuY29mZmVlUGxhbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnN0YXJ0UGxheWVyU2hha2luZygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnaGFydmVzdGVkJzpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gJ3dhdGVyZWQnO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlydC5pbWFnZSA9IElNQUdFX05BTUVTLnRleHR1cmVXZXREaXJ0O1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuaXNXYXRlcmluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnN0YXJ0UGxheWVyU2hha2luZygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnd2F0ZXJlZCc6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNsYXNzIENvZmZlZVJhY2sgaW1wbGVtZW50cyBJbnRlcmFjdGFibGUge1xuICAgIGxvY2F0aW9uOiBQb2ludDtcbiAgICB3aWR0aDogbnVtYmVyO1xuICAgIGhlaWdodDogbnVtYmVyO1xuICAgIHN0YXRlOiAnZW1wdHknIHwgJ2RyeWluZycgfCAnZHJpZWQnO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBnYW1lOiBHYW1lLCBwcml2YXRlIG9iamVjdDogR2FtZU9iamVjdCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gJ2VtcHR5JztcbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9IHtcbiAgICAgICAgICAgIHg6IG9iamVjdC5sb2NhdGlvbi54IC0gMC41LFxuICAgICAgICAgICAgeTogb2JqZWN0LmxvY2F0aW9uLnkgLSAwLjUsXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53aWR0aCA9IDI7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMjtcbiAgICB9XG5cbiAgICBvbkludGVyYWN0KCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2VtcHR5JzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nYW1lLm51bUhhcnZlc3RlZENvZmZlZSA+PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5udW1IYXJ2ZXN0ZWRDb2ZmZWUgLT0gNDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9ICdkcnlpbmcnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9iamVjdC5pbWFnZSA9IElNQUdFX05BTUVTLmNvZmZlZVJhY2tEcnlpbmc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5zdGFydFBsYXllclNoYWtpbmcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkcnlpbmcnOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZHJpZWQnOlxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5udW1EcmllZENvZmZlZSArPSA0O1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSAnZW1wdHknO1xuICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0LmltYWdlID0gSU1BR0VfTkFNRVMuY29mZmVlUmFjaztcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuc3RhcnRQbGF5ZXJTaGFraW5nKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNsYXNzIEhvdXNlIGltcGxlbWVudHMgSW50ZXJhY3RhYmxlIHtcbiAgICBsb2NhdGlvbjogUG9pbnQ7XG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICBoZWlnaHQ6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZ2FtZTogR2FtZSwgb2JqZWN0OiBHYW1lT2JqZWN0KSB7XG4gICAgICAgIHRoaXMubG9jYXRpb24gPSB7XG4gICAgICAgICAgICB4OiBvYmplY3QubG9jYXRpb24ueCArIDEuNSxcbiAgICAgICAgICAgIHk6IG9iamVjdC5sb2NhdGlvbi55ICsgMS41LFxuICAgICAgICB9XG4gICAgICAgIHRoaXMud2lkdGggPSAxLjU7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMTtcbiAgICB9XG5cbiAgICBvbkludGVyYWN0KCkge1xuICAgICAgICB0aGlzLmdhbWUucGF1c2UgPSB0cnVlO1xuICAgICAgICBpZiAoY29uZmlybShcIkVuZCB5b3VyIGRheT9cIikpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5lbmREYXkoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5wYXVzZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jbGFzcyBOUEMgaW1wbGVtZW50cyBJbnRlcmFjdGFibGUge1xuICAgIGxvY2F0aW9uOiBQb2ludDtcbiAgICB3aWR0aDogbnVtYmVyO1xuICAgIGhlaWdodDogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBnYW1lOiBHYW1lLCBvYmplY3Q6IEdhbWVPYmplY3QsIHByaXZhdGUgZGlhbG9ndWVzOiB7IG5vbkZhaXJUcmFkZTogc3RyaW5nW10sIGZhaXJUcmFkZTogc3RyaW5nW119KSB7XG4gICAgICAgIHRoaXMubG9jYXRpb24gPSB7XG4gICAgICAgICAgICB4OiBvYmplY3QubG9jYXRpb24ueCAtIDAuNSxcbiAgICAgICAgICAgIHk6IG9iamVjdC5sb2NhdGlvbi55IC0gMC41LFxuICAgICAgICB9XG4gICAgICAgIHRoaXMud2lkdGggPSAyO1xuICAgICAgICB0aGlzLmhlaWdodCA9IDI7XG4gICAgfVxuXG4gICAgb25JbnRlcmFjdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5pc0ZhaXJUcmFkZSkge1xuICAgICAgICAgICAgdGhpcy5nYW1lLmRpYWxvZ3VlcyA9IFsuLi50aGlzLmRpYWxvZ3Vlcy5mYWlyVHJhZGVdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5nYW1lLmRpYWxvZ3VlcyA9IFsuLi50aGlzLmRpYWxvZ3Vlcy5ub25GYWlyVHJhZGVdO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jbGFzcyBUcnVjayBpbXBsZW1lbnRzIEludGVyYWN0YWJsZSB7XG4gICAgbG9jYXRpb246IFBvaW50O1xuICAgIHdpZHRoOiBudW1iZXI7XG4gICAgaGVpZ2h0OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdhbWU6IEdhbWUsIG9iamVjdDogR2FtZU9iamVjdCkge1xuICAgICAgICB0aGlzLmxvY2F0aW9uID0ge1xuICAgICAgICAgICAgeDogb2JqZWN0LmxvY2F0aW9uLnggLSAwLjUsXG4gICAgICAgICAgICB5OiBvYmplY3QubG9jYXRpb24ueSAtIDAuNSxcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndpZHRoID0gNztcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA0O1xuICAgIH1cblxuICAgIG9uSW50ZXJhY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLmdhbWUubnVtRHJpZWRDb2ZmZWUgPj0gMSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5pc0ZhaXJUcmFkZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2ZpdCA9IHRoaXMuZ2FtZS5udW1EcmllZENvZmZlZSAqIDE7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLm1vbmV5ICs9IHByb2ZpdDtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuZGlhbG9ndWVzID0gW2BXb2F3ISBZb3Ugc29sZCBzb21lIGNvZmZlZSBiZWFucyBmb3IgJCR7cHJvZml0fS5gLCBcIkluIGFkZGl0aW9uIHRvICQxMCBtaW5pbXVtIHdhZ2UgcGVyIGRheSFcIl07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2ZpdCA9IHRoaXMuZ2FtZS5udW1EcmllZENvZmZlZSAqIDAuMjU7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLm1vbmV5ICs9IHByb2ZpdDtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuZGlhbG9ndWVzID0gW2BIbW0uLi4gWW91IHNvbGQgc29tZSBjb2ZmZWUgYmVhbnMgZm9yICQke3Byb2ZpdH0uYF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmdhbWUubnVtRHJpZWRDb2ZmZWUgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5nYW1lLmRpYWxvZ3VlcyA9IFtcIk9vcHMuLi4gWW91IGRvbid0IGhhdmUgYW55IGRyaWVkIGNvZmZlZSBiZWFucyB0byBzZWxsLlwiXVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgR2FtZSB7XG4gICAgcHVibGljIHBsYXllcjogUGxheWVyID0ge1xuICAgICAgICBsb2NhdGlvbjoge1xuICAgICAgICAgICAgeDogMjUsXG4gICAgICAgICAgICB5OiA1LFxuICAgICAgICB9LFxuICAgICAgICBmYWNpbmdEaXJlY3Rpb246ICdmcm9udCcsXG4gICAgICAgIGlzV2F0ZXJpbmc6IGZhbHNlLFxuICAgIH07XG4gICAgcHVibGljIG51bUhhcnZlc3RlZENvZmZlZTogbnVtYmVyID0gMDtcbiAgICBwdWJsaWMgbnVtRHJpZWRDb2ZmZWU6IG51bWJlciA9IDA7XG4gICAgcHVibGljIGlzRmFpclRyYWRlOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIG1vbmV5OiBudW1iZXIgPSAzO1xuICAgIHB1YmxpYyBkYXk6IG51bWJlciA9IDE7XG5cbiAgICBwdWJsaWMgZ2FtZU9iamVjdHM6IEFycmF5PEdhbWVPYmplY3Q+O1xuXG4gICAgcHVibGljIGRpYWxvZ3Vlczogc3RyaW5nW10gPSBbXCJZb3UgbGl2ZSB0aGUgbGlmZSBvZiBhIG1lbWJlciBpbiBhIHNtYWxsIGNvZmZlZSBmYXJtLlwiLCBcIllvdSBhbmQgeW91ciB0ZWFtIGFyZSBmYWlsaW5nIHRvIGNvbXBldGUgd2l0aCBsYXJnZXIgcGxhbnRhdGlvbnMgYW5kIGhhdmUgZGlmZmljdWx0eSBpbXByb3ZpbmcgeW91ciBsaWZlc3R5bGUvZmFybSxcIiwgXCJzaW5jZSB5b3VyIGN1c3RvbWVycyBhcmUgbGltaXRlZCB0byBsb2NhbHMgYW5kIGZldyB0cmFkZXJzIHdpbGwgYnV5IHlvdXIgcHJvZHVjdCBhdCBtYXJrZXQgcHJpY2UuXCIsIFwiV2hhdCBpcyBnb2luZyB0byBoYXBwZW4gdG8geW91P1wiXTtcblxuICAgIHB1YmxpYyBwYXVzZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHVibGljIGRhcmtPdmVybGF5PzogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSB0cnVjazogR2FtZU9iamVjdDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnBvcHVsYXRlR2FtZU9iamVjdHNBcnJheSgpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGlmIHRoZSBtb3ZlbWVudCBpcyBsZWdhbFxuICAgIHB1YmxpYyBpbGxlZ2FsU3RlcCh0YXJnZXQ6IFBvaW50KSB7XG4gICAgICAgIGxldCB0YXJnZXRfeCA9IHRhcmdldC54ICsgMC41O1xuICAgICAgICBsZXQgdGFyZ2V0X3kgPSB0YXJnZXQueSArIDAuNTtcbiAgICAgICAgZm9yIChsZXQgb2JqIG9mIHRoaXMuZ2FtZU9iamVjdHMpIHtcblxuICAgICAgICAgICAgaWYgKG9iai5jb2xsaXNpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgY29sbGlzaW9uX3gwID0gb2JqLmNvbGxpc2lvbi54MDtcbiAgICAgICAgICAgIGxldCBjb2xsaXNpb25feTAgPSBvYmouY29sbGlzaW9uLnkwO1xuICAgICAgICAgICAgbGV0IGNvbGxpc2lvbl94MSA9IG9iai5jb2xsaXNpb24ueDAgKyBvYmouY29sbGlzaW9uLndpZHRoO1xuICAgICAgICAgICAgbGV0IGNvbGxpc2lvbl95MSA9IG9iai5jb2xsaXNpb24ueTAgKyBvYmouY29sbGlzaW9uLmhlaWdodDtcblxuICAgICAgICAgICAgaWYgKHRhcmdldF94ID49IGNvbGxpc2lvbl94MCAmJlxuICAgICAgICAgICAgICAgIHRhcmdldF94IDw9IGNvbGxpc2lvbl94MSAmJlxuICAgICAgICAgICAgICAgIHRhcmdldF95ID49IGNvbGxpc2lvbl95MCAmJlxuICAgICAgICAgICAgICAgIHRhcmdldF95IDw9IGNvbGxpc2lvbl95MSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLy8gUHJvY2VzcyBwbGF5ZXIgbW92ZW1lbnRcbiAgICBwdWJsaWMgcHJvY2Vzcyhtb3ZlbWVudDogTW92ZW1lbnQsIGludGVyYWN0OiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLmRhcmtPdmVybGF5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGFya092ZXJsYXkgLT0gMC4wMjtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhcmtPdmVybGF5IDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGFya092ZXJsYXkgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wYXVzZSkgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0aGlzLmRpYWxvZ3Vlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpZiAoaW50ZXJhY3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3Vlcy5zcGxpY2UoMCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wbGF5ZXIuc2hha2VBbmltYXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuc2hha2VBbmltYXRpb24gKz0gMC4yICogTWF0aC5QSTtcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllci5zaGFrZUFuaW1hdGlvbiA+IDYgKiBNYXRoLlBJKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuc2hha2VBbmltYXRpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuaXNXYXRlcmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAoaW50ZXJhY3QpIHtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllckNlbnRlclggPSB0aGlzLnBsYXllci5sb2NhdGlvbi54ICsgMC41O1xuICAgICAgICAgICAgY29uc3QgcGxheWVyQ2VudGVyWSA9IHRoaXMucGxheWVyLmxvY2F0aW9uLnkgKyAwLjU7XG4gICAgICAgICAgICBmb3IgKGxldCBvYmogb2YgdGhpcy5nYW1lT2JqZWN0cykge1xuICAgICAgICAgICAgICAgIGlmIChvYmouaW50ZXJhY3Rpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnRlcmFjdGlvbiA9IG9iai5pbnRlcmFjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGludGVyYWN0aW9uLmxvY2F0aW9uLnggPD0gcGxheWVyQ2VudGVyWCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyQ2VudGVyWCA8PSBpbnRlcmFjdGlvbi5sb2NhdGlvbi54ICsgaW50ZXJhY3Rpb24ud2lkdGggJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGludGVyYWN0aW9uLmxvY2F0aW9uLnkgPD0gcGxheWVyQ2VudGVyWSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyQ2VudGVyWSA8PSBpbnRlcmFjdGlvbi5sb2NhdGlvbi55ICsgaW50ZXJhY3Rpb24uaGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJhY3Rpb24ub25JbnRlcmFjdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIE1vdmVcbiAgICAgICAgICAgIGxldCB7IGR4LCBkeSB9ID0gbW92ZW1lbnQ7XG5cbiAgICAgICAgICAgIGlmIChkeCA9PT0gMSAmJiBkeSA9PT0gMCB8fCBkeCA9PT0gMSAmJiB0aGlzLnBsYXllci5mYWNpbmdEaXJlY3Rpb24gPT09ICdyaWdodCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5mYWNpbmdEaXJlY3Rpb24gPSAncmlnaHQnO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkeCA9PT0gLTEgJiYgZHkgPT09IDAgfHwgZHggPT09IC0xICYmIHRoaXMucGxheWVyLmZhY2luZ0RpcmVjdGlvbiA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuZmFjaW5nRGlyZWN0aW9uID0gJ2xlZnQnO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkeCA9PT0gMCAmJiBkeSA9PT0gMSB8fCBkeSA9PT0gMSAmJiB0aGlzLnBsYXllci5mYWNpbmdEaXJlY3Rpb24gPT09ICdmcm9udCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5mYWNpbmdEaXJlY3Rpb24gPSAnZnJvbnQnO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkeCA9PT0gMCAmJiBkeSA9PT0gLTEgfHwgZHkgPT09IC0xICYmIHRoaXMucGxheWVyLmZhY2luZ0RpcmVjdGlvbiA9PT0gJ2JhY2snKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuZmFjaW5nRGlyZWN0aW9uID0gJ2JhY2snO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMoZHgpICE9PSAwICYmIE1hdGguYWJzKGR5KSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGR4IC89IE1hdGguU1FSVDI7XG4gICAgICAgICAgICAgICAgZHkgLz0gTWF0aC5TUVJUMjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG5leHQgPSB7XG4gICAgICAgICAgICAgICAgeDogdGhpcy5wbGF5ZXIubG9jYXRpb24ueCArIGR4ICogUExBWUVSX1NQRUVELFxuICAgICAgICAgICAgICAgIHk6IHRoaXMucGxheWVyLmxvY2F0aW9uLnkgKyBkeSAqIFBMQVlFUl9TUEVFRCxcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLmlsbGVnYWxTdGVwKG5leHQpKSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJNb3ZlXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmxvY2F0aW9uLnggPSBuZXh0Lng7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIubG9jYXRpb24ueSA9IG5leHQueTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJJbGxlZ2FsIHN0ZXAhXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXJ0UGxheWVyU2hha2luZygpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIuc2hha2VBbmltYXRpb24gPSAwO1xuICAgIH1cblxuICAgIHB1YmxpYyBlbmREYXkoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRmFpclRyYWRlKSB7XG4gICAgICAgICAgICB0aGlzLm1vbmV5ICs9IDEwO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKS5oaWRkZW4gPSB0cnVlO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kLW9mLWRheScpLmhpZGRlbiA9IGZhbHNlO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmcnKS5oaWRkZW4gPSBmYWxzZTtcblxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFsYW5jZS1sYWJlbCcpLmlubmVyVGV4dCA9IGBCYWxhbmNlOiBcXCQke3RoaXMubW9uZXl9YDtcblxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV4dGRheScpLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29zdCA9IDA7XG4gICAgICAgICAgICBpZiAoKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb29kJykgYXMgSFRNTElucHV0RWxlbWVudCkuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgIGNvc3QgKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvdXNpbmcnKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgY29zdCArPSAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW1wcm92ZW1lbnRzJykgYXMgSFRNTElucHV0RWxlbWVudCkuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgIGNvc3QgKz0gMTAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWR1Y2F0aW9uJykgYXMgSFRNTElucHV0RWxlbWVudCkuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgIGNvc3QgKz0gMTI1O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvc3QgPiB0aGlzLm1vbmV5KSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJOb3QgZW5vdWdoIGZ1bmQuXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vbmV5IC09IGNvc3Q7XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJykuaGlkZGVuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZC1vZi1kYXknKS5oaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiZycpLmhpZGRlbiA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm5leHREYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmV4dERheSgpIHtcbiAgICAgICAgdGhpcy5wYXVzZSA9IGZhbHNlO1xuXG4gICAgICAgIGZvciAobGV0IG9iaiBvZiB0aGlzLmdhbWVPYmplY3RzKSB7XG4gICAgICAgICAgICBpZiAob2JqLmludGVyYWN0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbnRlcmFjdGlvbiA9IG9iai5pbnRlcmFjdGlvbjtcbiAgICAgICAgICAgICAgICBpZiAoaW50ZXJhY3Rpb24gaW5zdGFuY2VvZiBDb2ZmZWVQbGFudCAmJiBpbnRlcmFjdGlvbi5zdGF0ZSA9PT0gJ3dhdGVyZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGludGVyYWN0aW9uLnN0YXRlID0gJ3VuaGFydmVzdGVkJztcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJhY3Rpb24uZGlydC5pbWFnZSA9IElNQUdFX05BTUVTLnRleHR1cmVEaXJ0O1xuICAgICAgICAgICAgICAgICAgICBvYmouaW1hZ2UgPSBJTUFHRV9OQU1FUy5jb2ZmZWVQbGFudEJlcnJpZXM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpbnRlcmFjdGlvbiBpbnN0YW5jZW9mIENvZmZlZVJhY2sgJiYgaW50ZXJhY3Rpb24uc3RhdGUgPT09ICdkcnlpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGludGVyYWN0aW9uLnN0YXRlID0gJ2RyaWVkJztcbiAgICAgICAgICAgICAgICAgICAgb2JqLmltYWdlID0gSU1BR0VfTkFNRVMuY29mZmVlUmFja0RyaWVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGF5Kys7XG4gICAgICAgIGlmICh0aGlzLmRheSA9PT0gMykge1xuICAgICAgICAgICAgdGhpcy5pc0ZhaXJUcmFkZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnRydWNrLmltYWdlID0gSU1BR0VfTkFNRVMuZW52aXJvbm1lbnRUcnVja0ZhaXJUcmFkZTtcbiAgICAgICAgICAgIHRoaXMuZGlhbG9ndWVzID0gW1wiWW91ciBmYXJtIGhhcyBwYXJ0bmVyZWQgd2l0aCBGYWlydHJhZGUhXCIsXCJUaGUgYXJyaXZhbCBvZiBGYWlydHJhZGUgbWVhbnMgdGhhdCB5b3VyIGZhcm0gaGFzIGFjY2VzcyB0byBpbnRlcm5hdGlvbmFsIG1hcmtldHNcIiwgXCJhbmQgcmVjZWl2ZXMgYXQgbGVhc3QgdGhlIHN0YWJsZSBtaW5pbXVtIHByaWNlIHNldCBieSBGYWlydHJhZGUsXCIsIFwiYWxvbmcgd2l0aCBhZGRpdGlvbmFsIHByZW1pdW1zIHRoYXQgY2FuIGdvIHRvd2FyZHMgZmFybSBpbnZlc3RtZW50cyBvciBlZHVjYXRpb24uXCJdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaGFja1xuICAgICAgICB0aGlzLnBhdXNlID0gdHJ1ZTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBhdXNlID0gZmFsc2U7XG4gICAgICAgIH0sIDEwMCk7XG5cbiAgICAgICAgdGhpcy5kYXJrT3ZlcmxheSA9IDEuNTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBvcHVsYXRlR2FtZU9iamVjdHNBcnJheSgpIHtcbiAgICAgICAgbGV0IGdhbWVPYmplY3RzOiBBcnJheTxHYW1lT2JqZWN0PiA9IFtdO1xuXG4gICAgICAgIC8vIGFkZCBiYWNrZ3JvdW5kIHRpbGVzIChnYW1lIGJvYXJkIDMwIHggMjApXG4gICAgICAgIC8vIGdyYXNzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IE1BUF9XSURUSDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8PSBNQVBfSEVJR0hUOyBqKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgZ3Jhc3MgPSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBpLFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogaixcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IElNQUdFX05BTUVTLnRleHR1cmVHcmFzc1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBnYW1lT2JqZWN0cy5wdXNoKGdyYXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFkZCBob3VzZVxuICAgICAgICBsZXQgaG91c2VMb2NhdGlvbiA9IHtcbiAgICAgICAgICAgIHg6IDIwLFxuICAgICAgICAgICAgeTogMixcbiAgICAgICAgfVxuICAgICAgICBsZXQgaG91c2U6IEdhbWVPYmplY3QgPSB7XG4gICAgICAgICAgICBsb2NhdGlvbjoge1xuICAgICAgICAgICAgICAgIHg6IGhvdXNlTG9jYXRpb24ueCxcbiAgICAgICAgICAgICAgICB5OiBob3VzZUxvY2F0aW9uLnksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgd2lkdGg6IDQsXG4gICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICBpbWFnZTogSU1BR0VfTkFNRVMuaG91c2UsXG4gICAgICAgICAgICBjb2xsaXNpb246IHtcbiAgICAgICAgICAgICAgICB4MDogaG91c2VMb2NhdGlvbi54LFxuICAgICAgICAgICAgICAgIHkwOiBob3VzZUxvY2F0aW9uLnksXG4gICAgICAgICAgICAgICAgd2lkdGg6IDQsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAyLFxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBsZXQgaG91c2VpID0gbmV3IEhvdXNlKHRoaXMsIGhvdXNlKTtcbiAgICAgICAgaG91c2UuaW50ZXJhY3Rpb24gPSBob3VzZWk7XG4gICAgICAgIGdhbWVPYmplY3RzLnB1c2goaG91c2UpO1xuXG4gICAgICAgIC8vIGFkZCBjb2ZmZWUgcGxhbnRzIGFuZCBkaXJ0XG4gICAgICAgIGZvciAobGV0IGkgPSA0OyBpIDw9IDg7IGkgKz0gMikge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDk7IGogPCAxNzsgaisrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRpcnQgPSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBpLFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogaixcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IElNQUdFX05BTUVTLnRleHR1cmVEaXJ0LFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgZ2FtZU9iamVjdHMucHVzaChkaXJ0KTtcblxuICAgICAgICAgICAgICAgIGxldCBvYmo6IEdhbWVPYmplY3QgPSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBpLFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogaixcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IElNQUdFX05BTUVTLmNvZmZlZVBsYW50QmVycmllcyxcbiAgICAgICAgICAgICAgICAgICAgY29sbGlzaW9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4MDogaSArIDAuMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHkwOiBqICsgMC4yNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAwLjgsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDAuNSxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgY29uc3QgY29mZmVlUGxhbnQgPSBuZXcgQ29mZmVlUGxhbnQodGhpcywgb2JqLCBkaXJ0KTtcbiAgICAgICAgICAgICAgICBvYmouaW50ZXJhY3Rpb24gPSBjb2ZmZWVQbGFudDtcbiAgICAgICAgICAgICAgICBnYW1lT2JqZWN0cy5wdXNoKG9iaik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhZGQgY29mZmVlIGJlYW4gZHJ5ZXJzXG4gICAgICAgIGZvciAobGV0IGkgPSAxMTsgaSA8PSAxNzsgaSArPSAzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gNjsgaiA8PSA5OyBqICs9IDMpIHtcbiAgICAgICAgICAgICAgICBsZXQgb2JqOiBHYW1lT2JqZWN0ID0ge1xuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogaSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IGosXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiBJTUFHRV9OQU1FUy5jb2ZmZWVSYWNrLFxuICAgICAgICAgICAgICAgICAgICBjb2xsaXNpb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHgwOiBpICsgMC4xNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHkwOiBqICsgMC4xLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDAuNyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogMC44LFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2ZmZWVSYWNrID0gbmV3IENvZmZlZVJhY2sodGhpcywgb2JqKTtcbiAgICAgICAgICAgICAgICBvYmouaW50ZXJhY3Rpb24gPSBjb2ZmZWVSYWNrO1xuICAgICAgICAgICAgICAgIGdhbWVPYmplY3RzLnB1c2gob2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFkZCBUb3AvQm90dG9tIGZlbmNlc1xuICAgICAgICB2YXIgZmVuY2VcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBNQVBfV0lEVEggLSAxOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGxldCBmZW5jZVRvcCA9IHtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICB4OiBpICsgRkVOQ0VfT0ZGX1NFVCxcbiAgICAgICAgICAgICAgICAgICAgeTogRkVOQ0VfT0ZGX1NFVCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgICAgICBpbWFnZTogSU1BR0VfTkFNRVMuZW52aXJvbm1lbnRGZW5jZUhvcml6b250YWwsXG4gICAgICAgICAgICAgICAgY29sbGlzaW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIHgwOiBpICsgRkVOQ0VfT0ZGX1NFVCxcbiAgICAgICAgICAgICAgICAgICAgeTA6IEZFTkNFX09GRl9TRVQsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGZlbmNlQm90ID0ge1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGkgKyBGRU5DRV9PRkZfU0VULFxuICAgICAgICAgICAgICAgICAgICB5OiBNQVBfSEVJR0hUIC0gMSAtIEZFTkNFX09GRl9TRVQsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICAgICAgaW1hZ2U6IElNQUdFX05BTUVTLmVudmlyb25tZW50RmVuY2VIb3Jpem9udGFsLFxuICAgICAgICAgICAgICAgIGNvbGxpc2lvbjoge1xuICAgICAgICAgICAgICAgICAgICB4MDogaSArIEZFTkNFX09GRl9TRVQsXG4gICAgICAgICAgICAgICAgICAgIHkwOiBNQVBfSEVJR0hUIC0gMSAtIEZFTkNFX09GRl9TRVQsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2FtZU9iamVjdHMucHVzaChmZW5jZVRvcCk7XG4gICAgICAgICAgICBnYW1lT2JqZWN0cy5wdXNoKGZlbmNlQm90KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8gYWRkIHNpZGUgZmVuY2VzXG4gICAgICAgIGZvciAobGV0IGkgPSA0OyBpIDwgTUFQX0hFSUdIVCAtIDE7IGkgKz0gMSkge1xuICAgICAgICAgICAgbGV0IGZlbmNlTGVmdCA9IHtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICB4OiBGRU5DRV9PRkZfU0VULFxuICAgICAgICAgICAgICAgICAgICB5OiBpICsgRkVOQ0VfT0ZGX1NFVCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgICAgICBpbWFnZTogSU1BR0VfTkFNRVMuZW52aXJvbm1lbnRGZW5jZUxlZnQsXG4gICAgICAgICAgICAgICAgY29sbGlzaW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIHgwOiBGRU5DRV9PRkZfU0VULFxuICAgICAgICAgICAgICAgICAgICB5MDogaSArIEZFTkNFX09GRl9TRVQsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAwLjIsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnYW1lT2JqZWN0cy5wdXNoKGZlbmNlTGVmdCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBNQVBfSEVJR0hUIC0gMTsgaSArPSAxKSB7XG4gICAgICAgICAgICBsZXQgZmVuY2VSaWdodCA9IHtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICB4OiBNQVBfV0lEVEggLSAxIC0gRkVOQ0VfT0ZGX1NFVCxcbiAgICAgICAgICAgICAgICAgICAgeTogaSArIEZFTkNFX09GRl9TRVQsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICAgICAgaW1hZ2U6IElNQUdFX05BTUVTLmVudmlyb25tZW50RmVuY2VSaWdodCxcbiAgICAgICAgICAgICAgICBjb2xsaXNpb246IHtcbiAgICAgICAgICAgICAgICAgICAgeDA6IE1BUF9XSURUSCAtIDAuMiAtIEZFTkNFX09GRl9TRVQsXG4gICAgICAgICAgICAgICAgICAgIHkwOiBpICsgRkVOQ0VfT0ZGX1NFVCxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDAuMixcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdhbWVPYmplY3RzLnB1c2goZmVuY2VSaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQbGFjZWhvbGQgYWlyIHdhbGxcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCA0OyBpICs9IDEpIHtcbiAgICAgICAgICAgIGxldCBmZW5jZUxlZnQgPSB7XG4gICAgICAgICAgICAgICAgbG9jYXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgeDogRkVOQ0VfT0ZGX1NFVCxcbiAgICAgICAgICAgICAgICAgICAgeTogaSArIEZFTkNFX09GRl9TRVQsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICAgICAgaW1hZ2U6IElNQUdFX05BTUVTLmVudmlyb25tZW50RmVuY2VMZWZ0LFxuICAgICAgICAgICAgICAgIGNvbGxpc2lvbjoge1xuICAgICAgICAgICAgICAgICAgICB4MDogRkVOQ0VfT0ZGX1NFVCxcbiAgICAgICAgICAgICAgICAgICAgeTA6IGkgKyBGRU5DRV9PRkZfU0VULFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMC4yLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2FtZU9iamVjdHMucHVzaChmZW5jZUxlZnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWRkIHJvYWRcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxODsgaSArPSAxKSB7XG4gICAgICAgICAgICBsZXQgcm9hZCA9IHtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICB4OiBpLFxuICAgICAgICAgICAgICAgICAgICB5OiAzLjUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICAgICAgaW1hZ2U6IElNQUdFX05BTUVTLmVudmlyb25tZW50Um9hZCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBnYW1lT2JqZWN0cy5wdXNoKHJvYWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWRkIHRydWNrXG4gICAgICAgIGxldCB0cnVjazogR2FtZU9iamVjdCA9IHtcbiAgICAgICAgICAgIGxvY2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgeDogMTAsXG4gICAgICAgICAgICAgICAgeTogMS4yLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHdpZHRoOiA2LFxuICAgICAgICAgICAgaGVpZ2h0OiAzLFxuICAgICAgICAgICAgaW1hZ2U6IElNQUdFX05BTUVTLmVudmlyb25tZW50VHJ1Y2tDYXBpdGFsLFxuICAgICAgICAgICAgY29sbGlzaW9uOiB7XG4gICAgICAgICAgICAgICAgeDA6IDEwLFxuICAgICAgICAgICAgICAgIHkwOiAyLjIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDUuNSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDIsXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudHJ1Y2sgPSB0cnVjaztcbiAgICAgICAgbGV0IHRydWNraSA9IG5ldyBUcnVjayh0aGlzLCB0cnVjayk7XG4gICAgICAgIHRydWNrLmludGVyYWN0aW9uID0gdHJ1Y2tpO1xuICAgICAgICBnYW1lT2JqZWN0cy5wdXNoKHRydWNrKTtcblxuICAgICAgICAvLyBhZGQgbnBjc1xuICAgICAgICBsZXQgbnBjMTogR2FtZU9iamVjdCA9IHtcbiAgICAgICAgICAgIGxvY2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgeDogOSxcbiAgICAgICAgICAgICAgICB5OiAxMSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgICAgIGltYWdlOiBJTUFHRV9OQU1FUy5ucGMxLFxuICAgICAgICAgICAgY29sbGlzaW9uOiB7XG4gICAgICAgICAgICAgICAgeDA6IDkuMjUsXG4gICAgICAgICAgICAgICAgeTA6IDExLjI1LFxuICAgICAgICAgICAgICAgIHdpZHRoOiAwLjUsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAwLjUsXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG5wYzFpID0gbmV3IE5QQyh0aGlzLCBucGMxLCB7XG4gICAgICAgICAgICBmYWlyVHJhZGU6IFtcIldpdGggRmFpcnRyYWRl4oCZcyBib251cyBwcmVtaXVtcyxcIiwgXCJ3ZSBjYW4gZmluYWxseSBzdGFydCBpbnZlc3RpbmcgYmFjayBpbnRvIG91ciBmYXJtIGFuZCBpbiBvdXIgY2hpbGRyZW7igJlzIGVkdWNhdGlvbnMhXCJdLFxuICAgICAgICAgICAgbm9uRmFpclRyYWRlOiBbXCJBbm90aGVyIGRheSBvZiBiYXJlbHkgc2NyYXBpbmcgYnkuXCIsIFwiSXTigJlzIGltcG9zc2libGUgdG8gc2F2ZSBtb25leSB1bmRlciB0aGVzZSBjb25kaXRpb25zLi4uXCJdLFxuICAgICAgICB9KTtcbiAgICAgICAgbnBjMS5pbnRlcmFjdGlvbiA9IG5wYzFpO1xuICAgICAgICBnYW1lT2JqZWN0cy5wdXNoKG5wYzEpO1xuXG4gICAgICAgIGxldCBucGMyOiBHYW1lT2JqZWN0ID0ge1xuICAgICAgICAgICAgbG9jYXRpb246IHtcbiAgICAgICAgICAgICAgICB4OiAxMCxcbiAgICAgICAgICAgICAgICB5OiA2LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICAgICAgaW1hZ2U6IElNQUdFX05BTUVTLm5wYzIsXG4gICAgICAgICAgICBjb2xsaXNpb246IHtcbiAgICAgICAgICAgICAgICB4MDogMTAuMjUsXG4gICAgICAgICAgICAgICAgeTA6IDYuMjUsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDAuNSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDAuNSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgbnBjMmkgPSBuZXcgTlBDKHRoaXMsIG5wYzIsIHtcbiAgICAgICAgICAgIGZhaXJUcmFkZTogW1wiSeKAmW0gcmVhbGx5IGdsYWQgRmFpcnRyYWRlIGhhcyBhIG1pbmltdW0gYnV5IHByaWNlIHNhZmV0eSBuZXQgZm9yIHVzLlwiLFwiQW5kIHdoZW4gdGhlIG1hcmtldCBwcmljZSBqdW1wcyBoaWdoZXIsIHdlIGdldCB0aGF0LCB0b28hXCJdLFxuICAgICAgICAgICAgbm9uRmFpclRyYWRlOiBbXCJJIGhvcGUgdGhlIHByaWNlIG9mIGNvZmZlZSBkb2VzbuKAmXQgZHJvcCB0b28gbXVjaC4uLlwiLCBcIkkgYmFyZWx5IG1hZGUgaXQgdGhyb3VnaCB0aGUgbGFzdCByZWNlc3Npb24uXCJdLFxuICAgICAgICB9KTtcbiAgICAgICAgbnBjMi5pbnRlcmFjdGlvbiA9IG5wYzJpO1xuICAgICAgICBnYW1lT2JqZWN0cy5wdXNoKG5wYzIpO1xuXG4gICAgICAgIGxldCBucGMzOiBHYW1lT2JqZWN0ID0ge1xuICAgICAgICAgICAgbG9jYXRpb246IHtcbiAgICAgICAgICAgICAgICB4OiA4LFxuICAgICAgICAgICAgICAgIHk6IDMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgICAgICBpbWFnZTogSU1BR0VfTkFNRVMubnBjMyxcbiAgICAgICAgICAgIGNvbGxpc2lvbjoge1xuICAgICAgICAgICAgICAgIHgwOiA4LjI1LFxuICAgICAgICAgICAgICAgIHkwOiAzLjI1LFxuICAgICAgICAgICAgICAgIHdpZHRoOiAwLjUsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAwLjUsXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG5wYzNpID0gbmV3IE5QQyh0aGlzLCBucGMzLCB7XG4gICAgICAgICAgICBmYWlyVHJhZGU6IFtcIkl0IGZlZWxzIGdvb2QgdG8gaGF2ZSBhY2Nlc3MgdG8gaW50ZXJuYXRpb25hbCBtYXJrZXRzIHRocm91Z2ggRmFpcnRyYWRl4oCZcyBoZWxwLlwiLFwiSSBmaW5hbGx5IGZlZWwgdGhhdCBteSBqb2IgaXMgbWFraW5nIGEgZGlmZmVyZW5jZSBvZiBzb3J0cy5cIl0sXG4gICAgICAgICAgICBub25GYWlyVHJhZGU6IFtcIkkgaGVhcmQgcGVvcGxlIG91dHNpZGUgb2Ygb3VyIGNvdW50cnkgcGF5IGdvb2QgbW9uZXkgZm9yIGNvZmZlZSBiZWFucy5cIiwgXCJXZSBjb3VsZCBuZXZlciBzZWxsIGZvciB0aGF0IG11Y2ggaGVyZS5cIl0sXG4gICAgICAgIH0pO1xuICAgICAgICBucGMzLmludGVyYWN0aW9uID0gbnBjM2k7XG4gICAgICAgIGdhbWVPYmplY3RzLnB1c2gobnBjMyk7XG5cbi8vICAgICAgICAgTlBDcyBiZWluZyBzYWRcbi8vIC1cdOKAnEFub3RoZXIgZGF5IG9mIGJhcmVseSBzY3JhcGluZyBieS4gSXTigJlzIGltcG9zc2libGUgdG8gc2F2ZSBtb25leSB1bmRlciB0aGVzZSBjb25kaXRpb25z4oCm4oCdXG4vLyAtXHTigJxJIGhvcGUgdGhlIHByaWNlIG9mIGNvZmZlZSBkb2VzbuKAmXQgZHJvcCB0b28gbXVjaOKApiBJIGJhcmVseSBtYWRlIGl0IHRocm91Z2ggdGhlIGxhc3QgcmVjZXNzaW9uLuKAnVxuLy8gLVx04oCcSSBoZWFyZCBwZW9wbGUgb3V0c2lkZSBvZiBvdXIgY291bnRyeSBwYXkgZ29vZCBtb25leSBmb3IgY29mZmVlIGJlYW5zLiBXZSBjb3VsZCBuZXZlciBzZWxsIGZvciB0aGF0IG11Y2ggaGVyZS7igJ1cbi8vIE5QQ3MgYmVpbmcgaGFwcHlcbi8vIC1cdOKAnFdpdGggRmFpcnRyYWRl4oCZcyBib251cyBwcmVtaXVtcywgd2UgY2FuIGZpbmFsbHkgc3RhcnQgaW52ZXN0aW5nIGJhY2sgaW50byBvdXIgZmFybSBhbmQgaW4gb3VyIGNoaWxkcmVu4oCZcyBlZHVjYXRpb25zIeKAnVxuLy8gLVx04oCcSeKAmW0gcmVhbGx5IGdsYWQgRmFpcnRyYWRlIGhhcyBhIG1pbmltdW0gYnV5IHByaWNlIHNhZmV0eSBuZXQgZm9yIHVzLiBBbmQgd2hlbiB0aGUgbWFya2V0IHByaWNlIGp1bXBzIGhpZ2hlciwgd2UgZ2V0IHRoYXQsIHRvbyHigJ1cbi8vIC1cdOKAnEl0IGZlZWxzIGdvb2QgdG8gaGF2ZSBhY2Nlc3MgdG8gaW50ZXJuYXRpb25hbCBtYXJrZXRzIHRocm91Z2ggRmFpcnRyYWRl4oCZcyBoZWxwLiBJIGZpbmFsbHkgZmVlbCB0aGF0IG15IGpvYiBpcyBtYWtpbmcgYSBkaWZmZXJlbmNlIG9mIHNvcnRzLuKAnVxuLy8gLVx04oCcRXZlcnkgbW9udGggd2UgZ2V0IHRvIHZvdGUgb24gd2hhdCB0byBpbnZlc3Qgb3VyIHByb2ZpdHMgaW4uIEkgY2Fu4oCZdCB3YWl0IHRvIHNlZSBvdXIgdG93biBncm93IeKAnVxuXG4gICAgICAgIHRoaXMuZ2FtZU9iamVjdHMgPSBnYW1lT2JqZWN0cztcbiAgICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsImltcG9ydCB7IEZQUywgUExBWUVSX1NJWkUsIE1BUF9IRUlHSFQsIE1BUF9XSURUSCwgR1JJRF9XSURUSCwgSU1BR0VfTkFNRVMsIFRPUF9CQVJfSEVJR0hUIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgQ29udHJvbGxlciB9IGZyb20gJy4vY29udHJvbGxlcic7XG5pbXBvcnQgeyBHYW1lLCBQb2ludCwgR2FtZU9iamVjdCB9IGZyb20gJy4vZ2FtZSc7XG5cbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbmNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcblxuY29uc3QgZ2FtZSA9IG5ldyBHYW1lKCk7XG5jb25zdCBjb250cm9sbGVyID0gbmV3IENvbnRyb2xsZXIoKTtcblxuZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIC8vIENsZWFyIGNhbnZhc1xuICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICAvLyBBZGp1c3QgY2FudmFzIHdpZHRoL2hlaWdodFxuICAgIGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAvLyBNb3ZlIHBsYXllclxuICAgIGNvbnN0IG1vdmVtZW50ID0gY29udHJvbGxlci5nZXRNb3ZlbWVudCgpO1xuICAgIGNvbnN0IGludGVyYWN0ID0gY29udHJvbGxlci5nZXRJbnRlcmFjdCgpO1xuICAgIGdhbWUucHJvY2Vzcyhtb3ZlbWVudCwgaW50ZXJhY3QpO1xuXG4gICAgY29uc3QgcGxheWVyUG9zaXRpb24gPSBjYWxjdWxhdGVQbGF5ZXJQb3NpdGlvbihnYW1lLnBsYXllci5sb2NhdGlvbik7XG5cbiAgICAvLy8gVXRpbGl0eSBmdW5jdGlvbiB0byBjYWxjdWxhdGUgdGhlIHBvc2l0aW9uIG9uIGNhbnZhc1xuICAgIGZ1bmN0aW9uIGNhbGN1bGF0ZVBvc2l0aW9uKGdyaWRMb2NhdGlvbjogUG9pbnQpOiBQb2ludCB7XG4gICAgICAgIHJldHVybiBjYWxjdWxhdGVPYmplY3RQb3NpdGlvbihncmlkTG9jYXRpb24sIGdhbWUucGxheWVyLmxvY2F0aW9uLCBwbGF5ZXJQb3NpdGlvbik7XG4gICAgfVxuXG4gICAgLy8gRHJhdyBncmlkIGxpbmVzXG4gICAgY29udGV4dC5zdHJva2VTdHlsZSA9ICdncmV5JztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IE1BUF9XSURUSDsgaSsrKSB7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGxldCBmcm9tID0gY2FsY3VsYXRlUG9zaXRpb24oeyB4OiBpLCB5OiAwIH0pO1xuICAgICAgICBsZXQgdG8gPSBjYWxjdWxhdGVQb3NpdGlvbih7IHg6IGksIHk6IE1BUF9IRUlHSFQgfSk7XG4gICAgICAgIGNvbnRleHQubW92ZVRvKGZyb20ueCwgZnJvbS55KTtcbiAgICAgICAgY29udGV4dC5saW5lVG8odG8ueCwgdG8ueSk7XG4gICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPD0gTUFQX0hFSUdIVDsgaisrKSB7XG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGxldCBmcm9tID0gY2FsY3VsYXRlUG9zaXRpb24oeyB4OiAwLCB5OiBqIH0pO1xuICAgICAgICBsZXQgdG8gPSBjYWxjdWxhdGVQb3NpdGlvbih7IHg6IE1BUF9XSURUSCwgeTogaiB9KTtcbiAgICAgICAgY29udGV4dC5tb3ZlVG8oZnJvbS54LCBmcm9tLnkpO1xuICAgICAgICBjb250ZXh0LmxpbmVUbyh0by54LCB0by55KTtcbiAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICB9XG5cbiAgICAvLyBEcmF3IGdhbWUgb2JqZWN0c1xuICAgIC8vIFRPRE86IGdldCB0aGVzZSBvYmplY3RzIGZyb20gZ2FtZVxuICAgIC8vIGNvbnN0IGdhbWVPYmplY3RzOiBHYW1lT2JqZWN0W10gPVxuXG4gICAgZm9yIChsZXQgb2JqIG9mIGdhbWUuZ2FtZU9iamVjdHMpIHtcbiAgICAgICAgLy8gVE9ETzogcmVtb3ZlIHRoaXMgbGF0ZXJcbiAgICAgICAgaWYgKG9iai5pbWFnZSA9PT0gJycpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHsgeCwgeSB9ID0gY2FsY3VsYXRlUG9zaXRpb24ob2JqLmxvY2F0aW9uKTtcbiAgICAgICAgbGV0IHsgeDogbWF4WCwgeTogbWF4WSB9ID0gY2FsY3VsYXRlUG9zaXRpb24oe1xuICAgICAgICAgICAgeDogb2JqLmxvY2F0aW9uLnggKyBvYmoud2lkdGgsXG4gICAgICAgICAgICB5OiBvYmoubG9jYXRpb24ueSArIG9iai5oZWlnaHQsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENoZWNrIHRoYXQgaW1hZ2UgaXMgaW5zaWRlIGNhbnZhc1xuICAgICAgICBpZiAoKHggPiBjYW52YXMud2lkdGggfHwgbWF4WCA8IDApICYmICh5ID4gY2FudmFzLmhlaWdodCAmJiBtYXhZIDwgMCkpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaW1hZ2UgPSBpbWFnZXNbb2JqLmltYWdlXTtcbiAgICAgICAgY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIHgsIHksIG1heFggLSB4LCBtYXhZIC0geSk7XG4gICAgfVxuXG4gICAgLy8gRk9SIERFQlVHR0lORyBQVVJQT1NFU1xuICAgIC8vIGZvciAobGV0IG9iaiBvZiBnYW1lLmdhbWVPYmplY3RzKSB7XG4gICAgLy8gICAgIC8vIFRPRE86IHJlbW92ZSB0aGlzIGxhdGVyXG4gICAgLy8gICAgIGlmIChvYmouY29sbGlzaW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyAgICAgICAgIGNvbnRpbnVlO1xuICAgIC8vICAgICB9XG5cbiAgICAvLyAgICAgbGV0IHsgeCwgeSB9ID0gY2FsY3VsYXRlUG9zaXRpb24oeyB4OiBvYmouY29sbGlzaW9uLngwLCB5OiBvYmouY29sbGlzaW9uLnkwIH0pO1xuICAgIC8vICAgICBsZXQgeyB4OiBtYXhYLCB5OiBtYXhZIH0gPSBjYWxjdWxhdGVQb3NpdGlvbih7XG4gICAgLy8gICAgICAgICB4OiBvYmouY29sbGlzaW9uLngwICsgb2JqLmNvbGxpc2lvbi53aWR0aCxcbiAgICAvLyAgICAgICAgIHk6IG9iai5jb2xsaXNpb24ueTAgKyBvYmouY29sbGlzaW9uLmhlaWdodCxcbiAgICAvLyAgICAgfSk7XG5cbiAgICAvLyAgICAgY29udGV4dC5saW5lV2lkdGggPSA0O1xuICAgIC8vICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gXCJyZWRcIjtcbiAgICAvLyAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAvLyAgICAgY29udGV4dC5yZWN0KHgsIHksIG1heFggLSB4LCBtYXhZIC0geSk7XG4gICAgLy8gICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgLy8gfVxuXG4gICAgLy8gRHJhdyBwbGF5ZXJcbiAgICBsZXQgaW1hZ2VOYW1lO1xuICAgIGlmICghZ2FtZS5wbGF5ZXIuaXNXYXRlcmluZykge1xuICAgICAgICBzd2l0Y2ggKGdhbWUucGxheWVyLmZhY2luZ0RpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSAnZnJvbnQnOlxuICAgICAgICAgICAgICAgIGltYWdlTmFtZSA9IElNQUdFX05BTUVTLmZhcm1lckZyb250O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYmFjayc6XG4gICAgICAgICAgICAgICAgaW1hZ2VOYW1lID0gSU1BR0VfTkFNRVMuZmFybWVyQmFjaztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgIGltYWdlTmFtZSA9IElNQUdFX05BTUVTLmZhcm1lckxlZnQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgaW1hZ2VOYW1lID0gSU1BR0VfTkFNRVMuZmFybWVyUmlnaHQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBzd2l0Y2ggKGdhbWUucGxheWVyLmZhY2luZ0RpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSAnZnJvbnQnOlxuICAgICAgICAgICAgICAgIGltYWdlTmFtZSA9IElNQUdFX05BTUVTLmZhcm1lcldhdGVyRnJvbnQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdiYWNrJzpcbiAgICAgICAgICAgICAgICBpbWFnZU5hbWUgPSBJTUFHRV9OQU1FUy5mYXJtZXJXYXRlckJhY2s7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICBpbWFnZU5hbWUgPSBJTUFHRV9OQU1FUy5mYXJtZXJXYXRlckxlZnQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgaW1hZ2VOYW1lID0gSU1BR0VfTkFNRVMuZmFybWVyV2F0ZXJSaWdodDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG4gICAgaWYgKGdhbWUucGxheWVyLnNoYWtlQW5pbWF0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2VzW2ltYWdlTmFtZV0sIHBsYXllclBvc2l0aW9uLngsIHBsYXllclBvc2l0aW9uLnksIEdSSURfV0lEVEgsIEdSSURfV0lEVEgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlc1tpbWFnZU5hbWVdLCBwbGF5ZXJQb3NpdGlvbi54LCBwbGF5ZXJQb3NpdGlvbi55ICsgR1JJRF9XSURUSCAqIDAuMDMgKiBNYXRoLnNpbihnYW1lLnBsYXllci5zaGFrZUFuaW1hdGlvbiksIEdSSURfV0lEVEgsIEdSSURfV0lEVEgpO1xuICAgIH1cblxuICAgIGlmIChnYW1lLmRpYWxvZ3Vlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IG1hcmdpbiA9IDMwO1xuICAgICAgICBjb25zdCBzdGFydFkgPSAwLjggKiBjYW52YXMuaGVpZ2h0O1xuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG4gICAgICAgIGNvbnRleHQuZmlsbFJlY3QobWFyZ2luLCBzdGFydFksIGNhbnZhcy53aWR0aCAtIDIgKiBtYXJnaW4sIGNhbnZhcy5oZWlnaHQgLSBtYXJnaW4gLSBzdGFydFkpO1xuICAgICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gJzEwcHggc29saWQgYmxhY2snO1xuICAgICAgICBjb250ZXh0LnN0cm9rZVJlY3QobWFyZ2luLCBzdGFydFksIGNhbnZhcy53aWR0aCAtIDIgKiBtYXJnaW4sIGNhbnZhcy5oZWlnaHQgLSBzdGFydFkgLSBtYXJnaW4pO1xuXG4gICAgICAgIGNvbnRleHQuZm9udCA9ICcyNHB4IFwiUHJlc3MgU3RhcnQgMlBcIic7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgICAgICAgY29udGV4dC5maWxsVGV4dChnYW1lLmRpYWxvZ3Vlc1swXSwgMiAqIG1hcmdpbiwgc3RhcnRZICsgMiAqIG1hcmdpbiwgY2FudmFzLndpZHRoIC0gNCAqIG1hcmdpbik7XG4gICAgfVxuXG4gICAgaWYgKGdhbWUuZGFya092ZXJsYXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICdibGFjayc7XG4gICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSBnYW1lLmRhcmtPdmVybGF5O1xuICAgICAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgfVxuXG59XG5cbi8vLyBDYWxjdWxhdGUgdGhlIHBsYXllcidzIGN1cnJlbnQgcG9zaXRpb24gb24gdGhlIGNhbnZhcywgZnJvbSB0aGUgZ3JpZCBsb2NhdGlvblxuZnVuY3Rpb24gY2FsY3VsYXRlUGxheWVyUG9zaXRpb24ocGxheWVyTG9jYXRpb246IFBvaW50KTogUG9pbnQge1xuICAgIGxldCB1cCA9IHBsYXllckxvY2F0aW9uLnkgKiBHUklEX1dJRFRIO1xuICAgIGxldCBkb3duID0gKE1BUF9IRUlHSFQgLSBwbGF5ZXJMb2NhdGlvbi55KSAqIEdSSURfV0lEVEg7XG4gICAgbGV0IGxlZnQgPSBwbGF5ZXJMb2NhdGlvbi54ICogR1JJRF9XSURUSDtcbiAgICBsZXQgcmlnaHQgPSAoTUFQX1dJRFRIIC0gcGxheWVyTG9jYXRpb24ueCkgKiBHUklEX1dJRFRIO1xuXG4gICAgY29uc3QgaGFsZldpZHRoID0gY2FudmFzLndpZHRoIC8gMjtcbiAgICBjb25zdCBoYWxmSGVpZ2h0ID0gY2FudmFzLmhlaWdodCAvIDI7XG5cbiAgICBsZXQgeDogbnVtYmVyO1xuICAgIGxldCB5OiBudW1iZXI7XG4gICAgaWYgKGxlZnQgPCBoYWxmV2lkdGgpIHtcbiAgICAgICAgeCA9IGxlZnQ7XG4gICAgfSBlbHNlIGlmIChyaWdodCA8IGhhbGZXaWR0aCkge1xuICAgICAgICB4ID0gY2FudmFzLndpZHRoIC0gcmlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgeCA9IGhhbGZXaWR0aDtcbiAgICB9XG4gICAgaWYgKHVwIDwgaGFsZkhlaWdodCkge1xuICAgICAgICB5ID0gdXA7XG4gICAgfSBlbHNlIGlmIChkb3duIDwgaGFsZkhlaWdodCkge1xuICAgICAgICB5ID0gY2FudmFzLmhlaWdodCAtIGRvd247XG4gICAgfSBlbHNlIHtcbiAgICAgICAgeSA9IGhhbGZIZWlnaHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgeCwgeSB9O1xufVxuXG4vLy8gQ2FsY3VsYXRlIHRoZSBwb3NpdGlvbiBpbiB0aGUgY2FudmFzIG9mIGEgZ2l2ZW4gcG9pbnRcbmZ1bmN0aW9uIGNhbGN1bGF0ZU9iamVjdFBvc2l0aW9uKFxuICAgIGdyaWRMb2NhdGlvbjogUG9pbnQsXG4gICAgcGxheWVyR3JpZExvY2F0aW9uOiBQb2ludCxcbiAgICBwbGF5ZXJQb3NpdGlvbjogUG9pbnQsXG4pOiBQb2ludCB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogcGxheWVyUG9zaXRpb24ueCArIEdSSURfV0lEVEggKiAoZ3JpZExvY2F0aW9uLnggLSBwbGF5ZXJHcmlkTG9jYXRpb24ueCksXG4gICAgICAgIHk6IHBsYXllclBvc2l0aW9uLnkgKyBHUklEX1dJRFRIICogKGdyaWRMb2NhdGlvbi55IC0gcGxheWVyR3JpZExvY2F0aW9uLnkpLFxuICAgIH07XG59XG5cbmxldCBpbWFnZXM6IHsgW2ltYWdlTmFtZTogc3RyaW5nXTogQ2FudmFzSW1hZ2VTb3VyY2UgfSA9IHt9O1xuXG5mdW5jdGlvbiBsb2FkSW1hZ2VzKGNhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XG4gICAgUHJvbWlzZS5hbGwoT2JqZWN0LnZhbHVlcyhJTUFHRV9OQU1FUylcbiAgICAgICAgLm1hcChpbWFnZU5hbWUgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIF8pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICBpbWFnZS5zcmMgPSBgYXNzZXRzLyR7aW1hZ2VOYW1lfWA7XG4gICAgICAgICAgICBpbWFnZXNbaW1hZ2VOYW1lXSA9IGltYWdlO1xuXG4gICAgICAgICAgICBpbWFnZS5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKHRydWUpO1xuICAgICAgICB9KSkpXG4gICAgICAgIC50aGVuKCgpID0+IGNhbGxiYWNrKCkpO1xufVxuXG5sb2FkSW1hZ2VzKCgpID0+IHNldEludGVydmFsKHJlbmRlciwgMTAwMCAvIEZQUykpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==