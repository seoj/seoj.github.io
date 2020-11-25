import { configurations } from "./configurations";
import { GameState } from "./game_state";
import { Model } from "./model";
import { Point } from "./point";

const canvas = document.querySelector('canvas');
const score = document.getElementById('score');
const ctx = canvas.getContext('2d');
const dimension = 320;
canvas.width = dimension;
canvas.height = dimension;
const cellSize = dimension / configurations.grid.size;
const center = Math.floor(dimension / 2);

export class View {
  constructor(private readonly model: Model) { }

  update() {
    clear();
    score.innerText = `Score: ${this.model.score}`;

    for (let i = 0; i < this.model.snake.positions.length; i++) {
      if (i === 0) {
        ctx.fillStyle = '#ff0';
      } else {
        ctx.fillStyle = '#0f0';
      }
      draw(this.model.snake.positions[i]);
    }

    ctx.fillStyle = '#f00';
    draw(this.model.food);

    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    switch (this.model.gameState) {
      case GameState.new:
        ctx.font = '64px VT323';
        ctx.fillText('Snake!', center, center);
        ctx.font = '24px VT323';
        if (navigator.maxTouchPoints) {
          ctx.fillText('Swipe to move', center, center + 64);
        }
        else {
          ctx.fillText('Use arrow key to move', center, center + 64);
        }
        break;
      case GameState.over:
        ctx.font = '24px VT323';
        ctx.fillText('GAME OVER', center, center);
        break;
    }
  }
}

function clear() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, dimension, dimension);
}

function draw(point: Point) {
  const d = Math.ceil(cellSize);
  ctx.fillRect(Math.floor(point.x * cellSize), Math.floor(point.y * cellSize), d, d);
}

const headBitmap = [
  [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  [0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
  [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 0, 1, 0, 0, 1],
  [1, 1, 1, 1, 0, 0, 1, 0, 0, 1],
  [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
