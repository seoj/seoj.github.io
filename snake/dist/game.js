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
