import { configurations } from "./configurations";
import { Direction, offsets, opposites } from "./direction";
import { Point } from "./point";

const center = new Point(
  Math.floor(configurations.grid.size / 2),
  Math.floor(configurations.grid.size / 2),
);

export class Snake {
  bufferedDirection: Direction;
  direction: Direction;
  length = configurations.snake.startLength;
  moveCountdown = 0;
  positions: Point[] = [center];
  speed = configurations.snake.startSpeed;

  constructor() {
    this.resetMoveCountdown();
  }

  next() {
    if (this.moveCountdown === 0) {
      if (this.direction !== opposites[this.bufferedDirection]) {
        this.direction = this.bufferedDirection;
      }
      const next = this.head.add(offsets[this.direction]);
      this.positions = [next, ...this.positions].slice(0, this.length);
      this.resetMoveCountdown();
    }
    this.moveCountdown--;
  }

  includes(point: Point) {
    return this.positions.some(e => e.equals(point));
  }

  private get head() {
    return this.positions[0];
  }

  collided() {
    if (this.head.x < 0 || this.head.x >= configurations.grid.size || this.head.y < 0 || this.head.y >= configurations.grid.size) {
      return true;
    }
    for (let i = 1; i < this.positions.length; i++) {
      if (this.positions[0].equals(this.positions[i])) {
        return true;
      }
    }
    return false;
  }

  eat() {
    this.length++;
    this.speed++;
    navigator.vibrate(100);
  }

  private resetMoveCountdown() {
    this.moveCountdown = Math.floor(configurations.fps / this.speed);
  }
}
