(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.config = void 0;
exports.config = {
    fps: 60,
    grid: {
        width: 25,
        height: 25
    }
};

},{}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.Game = void 0;
var config_1 = require("./config");
var point_1 = require("./point");
var snake_1 = require("./snake");
function getCenter() {
    var col = Math.floor(config_1.config.grid.width / 2);
    var row = Math.floor(config_1.config.grid.height / 2);
    return new point_1.Point(row, col);
}
var Game = /** @class */ (function () {
    function Game() {
        this.snake = null;
        this.food = null;
        this.speed = 4;
        this.movementCountdown = 0;
        this.gameOver = false;
    }
    Game.prototype.reset = function () {
        this.snake = new snake_1.Snake();
        var center = getCenter();
        this.snake.points.push(center, center);
        this.createFood();
        this.resetMovementCountdown();
        this.gameOver = false;
    };
    Game.prototype.resetMovementCountdown = function () {
        this.movementCountdown = Math.floor(config_1.config.fps / this.speed);
    };
    Game.prototype.next = function () {
        if (this.gameOver) {
            return;
        }
        if (this.movementCountdown === 0) {
            this.snake.next();
            if (this.isGameOver()) {
                this.gameOver = true;
            }
            if (this.snake.contains(this.food)) {
                this.snake.increment();
                this.speed++;
                this.createFood();
            }
            this.resetMovementCountdown();
        }
        this.movementCountdown--;
    };
    Game.prototype.isGameOver = function () {
        for (var _i = 0, _a = this.snake.points; _i < _a.length; _i++) {
            var p1 = _a[_i];
            for (var _b = 0, _c = this.snake.points; _b < _c.length; _b++) {
                var p2 = _c[_b];
                if (p1 !== p2 && p1.equals(p2)) {
                    return true;
                }
            }
        }
        for (var _d = 0, _e = this.snake.points; _d < _e.length; _d++) {
            var p = _e[_d];
            if (p.row < 0 || p.row >= config_1.config.grid.height || p.col < 0 || p.col >= config_1.config.grid.width) {
                return true;
            }
        }
        return false;
    };
    Game.prototype.createFood = function () {
        while (true) {
            this.food = new point_1.Point(randInt(config_1.config.grid.height), randInt(config_1.config.grid.width));
            if (!this.snake.contains(this.food)) {
                break;
            }
        }
    };
    return Game;
}());
exports.Game = Game;
function randInt(max) {
    return Math.floor(Math.random() * max);
}

},{"./config":1,"./point":4,"./snake":5}],3:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var config_1 = require("./config");
var game_1 = require("./game");
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var cell = {
    width: canvas.width / config_1.config.grid.width,
    height: canvas.height / config_1.config.grid.height
};
var gameOverText = document.getElementById('game-over');
var game = new game_1.Game();
game.reset();
var keyDirections = {
    'ArrowUp': 'up',
    'ArrowDown': 'down',
    'ArrowLeft': 'left',
    'ArrowRight': 'right'
};
window.addEventListener('keydown', function (event) {
    var direction = keyDirections[event.key];
    if (direction) {
        game.snake.setDirection(direction);
    }
});
var touchStart = null;
window.addEventListener('touchstart', function (event) {
    touchStart = event.touches.item(0);
});
window.addEventListener('touchmove', function (event) {
    var touch = event.touches.item(0);
    if (touchStart) {
        var xdiff = touch.clientX - touchStart.clientX;
        var ydiff = touch.clientY - touchStart.clientY;
        var hdir = void 0;
        if (xdiff < 0) {
            hdir = 'left';
        }
        else {
            hdir = 'right';
        }
        var vdir = void 0;
        if (ydiff < 0) {
            vdir = 'up';
        }
        else {
            vdir = 'down';
        }
        var dir = vdir;
        if (Math.abs(xdiff) > Math.abs(ydiff)) {
            dir = hdir;
        }
        game.snake.setDirection(dir);
        event.preventDefault();
    }
});
setInterval(function () {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    draw(game.food, 'red');
    for (var _i = 0, _a = game.snake.points; _i < _a.length; _i++) {
        var point = _a[_i];
        draw(point, 'green');
    }
});
setInterval(function () {
    game.next();
}, 1000 / config_1.config.fps);
function draw(point, fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fillRect(point.col * cell.width, point.row * cell.height, cell.width, cell.height);
}

},{"./config":1,"./game":2}],4:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.Point = void 0;
var Point = /** @class */ (function () {
    function Point(row, col) {
        this.row = row;
        this.col = col;
    }
    Point.prototype.equals = function (other) {
        return this.row === other.row && this.col === other.col;
    };
    Point.prototype.add = function (other) {
        return new Point(this.row + other.row, this.col + other.col);
    };
    return Point;
}());
exports.Point = Point;

},{}],5:[function(require,module,exports){
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.Snake = void 0;
var point_1 = require("./point");
var directionOffsets = {
    'up': new point_1.Point(-1, 0),
    'down': new point_1.Point(1, 0),
    'left': new point_1.Point(0, -1),
    'right': new point_1.Point(0, 1)
};
var directionOpposites = {
    'up': 'down',
    'down': 'up',
    'left': 'right',
    'right': 'left'
};
var Snake = /** @class */ (function () {
    function Snake() {
        this.points = [];
        this.direction = 'up';
    }
    Snake.prototype.setDirection = function (direction) {
        if (directionOpposites[this.direction] !== direction) {
            this.direction = direction;
        }
    };
    Snake.prototype.contains = function (point) {
        return this.points.some(function (e) { return e.equals(point); });
    };
    Snake.prototype.next = function () {
        var next = this.points[0].add(directionOffsets[this.direction]);
        this.points.unshift(next);
        this.points = this.points.slice(0, -1);
    };
    Snake.prototype.increment = function () {
        this.points = __spreadArrays(this.points, [this.points[this.points.length - 1]]);
    };
    return Snake;
}());
exports.Snake = Snake;

},{"./point":4}]},{},[3]);
