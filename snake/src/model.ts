import { configurations } from "./configurations";
import { Direction } from "./direction";
import { GameState } from "./game_state";
import { Point } from "./point";
import { Snake } from "./snake";

export class Model {
  gameState: GameState
  snake: Snake
  food: Point;
  gameOverCountdown: number;
  score: number;

  constructor() {
    this.reset();
  }

  private reset() {
    this.gameState = GameState.new;
    this.snake = new Snake();
    this.food = this.createFood();
    this.score = 0;
    this.resetGameOverCountdown();
  }

  private resetGameOverCountdown() {
    this.gameOverCountdown = configurations.fps * 3;
  }

  next() {
    switch (this.gameState) {
      case GameState.new:
        break;
      case GameState.running:
        this.snake.next();
        if (this.snake.collided()) {
          this.gameState = GameState.over;
          break;
        }
        if (this.snake.includes(this.food)) {
          this.snake.eat();
          this.score++;
          this.food = this.createFood();
        }
        break;
      case GameState.over:
        if (this.gameOverCountdown-- === 0) {
          this.reset();
        }
        break;
    }
  }

  private createFood() {
    while (true) {
      const food = new Point(
        randInt(1, configurations.grid.size - 1),
        randInt(1, configurations.grid.size - 1),
      );
      if (!this.snake.includes(food)) {
        return food;
      }
    }
  }

  set direction(direction: Direction) {
    this.snake.bufferedDirection = direction;
    if (this.gameState !== GameState.running) {
      this.gameState = GameState.running;
    }
  }
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}
