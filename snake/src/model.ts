export class Model {
  gridWidth = 25;
  gridHeight = 25;

  private snake: Snake | null = null;
  private food: Point | null = null;
  gameOver = false;

  private isOutOfBounds(point: Point) {
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

      if (this.snake.isSelfIntersecting || this.isOutOfBounds(this.snake.head!)) {
        this.gameOver = true;
        return;
      }

      if (this.food && this.snake.includes(this.food)) {
        this.snake.eat();
        this.generateFood();
      }
    }
  }

  get foodPosition(): Point | null {
    return this.food;
  }

  get snakePositions(): Point[] {
    if (!this.snake) {
      return [];
    }

    return this.snake.positions;
  }

  set snakeDirection(direction: Direction) {
    if (!this.snake) {
      return;
    }

    this.snake.direction = direction;
  }

  private generateFood() {
    while (true) {
      this.food = new Point(randInt(1, this.gridWidth - 1), randInt(1, this.gridHeight - 1));
      if (!this.snake?.positions.some(e => e.equals(this.food!))) {
        return;
      }
    }
  }
}

export class Point {
  constructor(
    readonly x: number,
    readonly y: number,
  ) { }

  add(other: Point): Point {
    return new Point(this.x + other.x, this.y + other.y);
  }

  equals(other: Point) {
    return this.x === other.x && this.y === other.y;
  }
}

class Snake {
  private _positions: Point[] = [];
  private _direction: Direction | null = null;
  private _uncomittedDirection: Direction | null = null;
  private _speed = 2;
  private _countdown = 0;
  length = 0;

  constructor(position: Point, length: number) {
    this._positions = [position];
    this.length = length;
    this.resetCountdown();
  }

  private resetCountdown() {
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

  get head(): Point | null {
    if (this._positions.length === 0) {
      return null;
    }
    return this._positions[0];
  }

  get positions(): Point[] {
    return this._positions;
  }

  set direction(direction: Direction) {
    if (this._direction && directionOpposites[this._direction] === direction) {
      return;
    }

    this._uncomittedDirection = direction;
  }

  includes(point: Point): boolean {
    return this.positions.some(e => e.equals(point));
  }

  get isSelfIntersecting(): boolean {
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

export enum Direction {
  up = 1,
  down = 2,
  left = 3,
  right = 4,
}

function randInt(from: number, to: number): number {
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
