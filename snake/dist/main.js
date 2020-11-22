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
