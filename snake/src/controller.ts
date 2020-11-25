import { configurations } from "./configurations";
import { Direction } from "./direction";
import { Model } from "./model";
import { View } from "./view";

const canvas = document.querySelector('canvas');

export class Controller {
  touch: Touch;

  constructor(
    private readonly model: Model,
    private readonly view: View,
  ) { }

  start() {
    document.addEventListener('keydown', (event) => {
      this.onKeyDown(event);
    });
    canvas.addEventListener('touchstart', (event) => {
      this.onTouchStart(event);
    });
    canvas.addEventListener('touchend', (event) => {
      this.onTouchEnd(event);
    });

    setInterval(() => {
      this.model.next();
      this.view.update();
    }, 1000 / configurations.fps);
  }

  private onKeyDown(event: KeyboardEvent) {
    const direction = keyDirectionMap[event.key];
    if (direction) {
      this.model.direction = direction;
      event.preventDefault();
    }
  }

  private onTouchStart(event: TouchEvent) {
    event.preventDefault();
    this.touch = event.touches[0];
  }

  private onTouchEnd(event: TouchEvent) {
    event.preventDefault();
    const touch = event.changedTouches[0];
    if (this.touch) {
      const diffX = touch.clientX - this.touch.clientX;
      const diffY = touch.clientY - this.touch.clientY;
      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          this.model.direction = Direction.left;
        }
        else {
          this.model.direction = Direction.right;
        }
      }
      else {
        if (diffY < 0) {
          this.model.direction = Direction.up;
        }
        else {
          this.model.direction = Direction.down;
        }
      }
    }
    this.touch = touch;
  }
}

const keyDirectionMap: Record<string, Direction> = {
  'ArrowUp': Direction.up,
  'ArrowDown': Direction.down,
  'ArrowLeft': Direction.left,
  'ArrowRight': Direction.right,
};