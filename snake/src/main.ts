import { config } from "./config";
import { Game } from "./game";
import { Point } from "./point";
import { Direction } from "./snake";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const cell = {
  width: canvas.width / config.grid.width,
  height: canvas.height / config.grid.height,
};
const gameOverText = document.getElementById('game-over');

const game = new Game();
game.reset();

const keyDirections: Record<string, Direction> = {
  'ArrowUp': 'up',
  'ArrowDown': 'down',
  'ArrowLeft': 'left',
  'ArrowRight': 'right',
};

window.addEventListener('keydown', (event) => {
  const direction = keyDirections[event.key];
  if (direction) {
    game.snake.setDirection(direction);
  }
});

let touchStart: Touch = null;
window.addEventListener('touchstart', (event) => {
  touchStart = event.touches.item(0);
});
window.addEventListener('touchmove', (event) => {
  const touch = event.touches.item(0);
  if (touchStart) {
    const xdiff = touch.clientX - touchStart.clientX;
    const ydiff = touch.clientY - touchStart.clientY;
    let hdir;
    if (xdiff < 0) {
      hdir = 'left';
    }
    else {
      hdir = 'right';
    }
    let vdir;
    if (ydiff < 0) {
      vdir = 'up';
    }
    else {
      vdir = 'down';
    }
    let dir = vdir;
    if (Math.abs(xdiff) > Math.abs(ydiff)) {
      dir = hdir;
    }
    game.snake.setDirection(dir);
    event.preventDefault();
  }
});

setInterval(() => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  draw(game.food, 'red');
  for (const point of game.snake.points) {
    draw(point, 'green');
  }
});

setInterval(() => {
  game.next();
}, 1000 / config.fps);

function draw(point: Point, fillStyle: string) {
  ctx.fillStyle = fillStyle;
  ctx.fillRect(point.col * cell.width, point.row * cell.height, cell.width, cell.height);
}
