export class Model {
    constructor() {
        this.gridWidth = 25;
        this.gridHeight = 25;
        this.snake = null;
        this.food = null;
        this.gameOver = false;
    }
    isOutOfBounds(point) {
        if (point.x < 0) {
            return true;
        }
        if (point.y < 0) {
            return true;
        }
        if (point.x >= this.gridWidth) {
            return true;
        }
        if (point.y >= this.gridHeight) {
            return true;
        }
        return false;
    }
    reset() {
        this.snake = new Snake(new Point(Math.floor(this.gridWidth / 2), Math.floor(this.gridHeight / 2)), 2);
        this.generateFood();
    }
    next() {
        if (this.snake && !this.gameOver) {
            this.snake.next();
            if (this.snake.isSelfIntersecting || this.isOutOfBounds(this.snake.head)) {
                this.gameOver = true;
                return;
            }
            if (this.food && this.snake.includes(this.food)) {
                this.snake.eat();
                this.generateFood();
            }
        }
    }
    get foodPosition() {
        return this.food;
    }
    get snakePositions() {
        if (!this.snake) {
            return [];
        }
        return this.snake.positions;
    }
    set snakeDirection(direction) {
        if (!this.snake) {
            return;
        }
        this.snake.direction = direction;
    }
    generateFood() {
        while (true) {
            this.food = new Point(randInt(1, this.gridWidth - 1), randInt(1, this.gridHeight - 1));
            if (!this.snake?.positions.some(e => e.equals(this.food))) {
                return;
            }
        }
    }
}
export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(other) {
        return new Point(this.x + other.x, this.y + other.y);
    }
    equals(other) {
        return this.x === other.x && this.y === other.y;
    }
}
class Snake {
    constructor(position, length) {
        this._positions = [];
        this._direction = null;
        this._uncomittedDirection = null;
        this._speed = 2;
        this._countdown = 0;
        this.length = 0;
        this._positions = [position];
        this.length = length;
        this.resetCountdown();
    }
    resetCountdown() {
        this._countdown = Math.floor(30 / this._speed);
    }
    next() {
        if (this.head && this._uncomittedDirection) {
            if (this._countdown-- === 0) {
                const next = this.head.add(directionOffset[this._uncomittedDirection]);
                this._positions.unshift(next);
                this._positions = this._positions.slice(0, this.length);
                this.resetCountdown();
                this._direction = this._uncomittedDirection;
            }
        }
    }
    get head() {
        if (this._positions.length === 0) {
            return null;
        }
        return this._positions[0];
    }
    get positions() {
        return this._positions;
    }
    set direction(direction) {
        if (this._direction && directionOpposites[this._direction] === direction) {
            return;
        }
        this._uncomittedDirection = direction;
    }
    includes(point) {
        return this.positions.some(e => e.equals(point));
    }
    get isSelfIntersecting() {
        for (let i = 1; i < this._positions.length; i++) {
            if (this._positions[0].equals(this._positions[i])) {
                return true;
            }
        }
        return false;
    }
    eat() {
        this._speed++;
        this.length++;
    }
}
export var Direction;
(function (Direction) {
    Direction[Direction["up"] = 1] = "up";
    Direction[Direction["down"] = 2] = "down";
    Direction[Direction["left"] = 3] = "left";
    Direction[Direction["right"] = 4] = "right";
})(Direction || (Direction = {}));
function randInt(from, to) {
    return Math.floor(Math.random() * (to - from) + from);
}
const directionOffset = {
    [Direction.up]: new Point(0, -1),
    [Direction.down]: new Point(0, 1),
    [Direction.left]: new Point(-1, 0),
    [Direction.right]: new Point(1, 0),
};
const directionOpposites = {
    [Direction.up]: Direction.down,
    [Direction.down]: Direction.up,
    [Direction.left]: Direction.right,
    [Direction.right]: Direction.left,
};
