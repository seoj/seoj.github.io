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
