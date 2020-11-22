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
