import { config } from "./config";
import { Point } from "./point";
import { Snake } from "./snake";

function getCenter() {
  const col = Math.floor(config.grid.width / 2);
  const row = Math.floor(config.grid.height / 2);
  return new Point(row, col);
}

export class Game {
  snake: Snake = null;
  food: Point = null;
  speed = 4;
  movementCountdown = 0;
  gameOver = false;

  constructor() { }

  reset() {
    this.snake = new Snake();
    const center = getCenter();
    this.snake.points.push(center, center);
    this.createFood();
    this.resetMovementCountdown();
    this.gameOver = false;
  }

  private resetMovementCountdown() {
    this.movementCountdown = Math.floor(config.fps / this.speed);
  }

  next() {
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
  }

  private isGameOver() {
    for (const p1 of this.snake.points) {
      for (const p2 of this.snake.points) {
        if (p1 !== p2 && p1.equals(p2)) {
          return true;
        }
      }
    }

    for (const p of this.snake.points) {
      if (p.row < 0 || p.row >= config.grid.height || p.col < 0 || p.col >= config.grid.width) {
        return true;
      }
    }

    return false;
  }

  private createFood() {
    while (true) {
      this.food = new Point(randInt(config.grid.height), randInt(config.grid.width));
      if (!this.snake.contains(this.food)) {
        break;
      }
    }
  }
}

function randInt(max: number) {
  return Math.floor(Math.random() * max);
}
