import { Direction, Model } from "./model";
import { View } from "./view";

const canvas = document.querySelector('canvas')!;

const keyDirections: Record<string, Direction> = {
  'ArrowUp': Direction.up,
  'ArrowDown': Direction.down,
  'ArrowLeft': Direction.left,
  'ArrowRight': Direction.right,
};

export class Controller {
  touch0: Touch | null = null;

  constructor(
    private readonly model: Model,
    private readonly view: View,
  ) { }

  start() {
    this.model.reset();

    document.addEventListener('keydown', (event) => {
      const direction = keyDirections[event.key];
      if (!direction) {
        return;
      }
      this.model.snakeDirection = direction;
      event.preventDefault();
    });

    canvas.addEventListener('touchstart', (event) => {
      event.preventDefault();
      this.touch0 = event.touches[0];
    });

    canvas.addEventListener('touchmove', (event) => {
      event.preventDefault();
      const touch = event.touches[0];
      if (this.touch0) {
        const diffX = touch.clientX - this.touch0.clientX;
        const diffY = touch.clientY - this.touch0.clientY;
        if (Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX < 0) {
            this.model.snakeDirection = Direction.left;
          } else {
            this.model.snakeDirection = Direction.right;
          }
        }
        else {
          if (diffY < 0) {
            this.model.snakeDirection = Direction.up;
          } else {
            this.model.snakeDirection = Direction.down;
          }
        }
      }
    });

    // Rendering loop
    setInterval(() => {
      this.view.update();
    });

    // Logic loop
    setInterval(() => {
      this.model.next();
    }, 1000 / 60);
  }
}
