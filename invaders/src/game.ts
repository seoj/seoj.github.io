import { Alien } from "./alien";
import { Assets } from "./assets";
import { Point } from "./point";
import { Rectangle } from "./rectangle";
import { Ship } from "./ship";

export class Game {
  entities = [];
  deleteList = [];
  ctx: CanvasRenderingContext2D;
  rectangle: Rectangle;
  assets = new Assets();
  fps = 60;

  reset() {
    this.entities = [];

    this.entities.push(new Ship(this));

    for (let r = 0; r < 10; r++) {
      const alien = new Alien(this);
      alien.image = this.assets.aliens[r % this.assets.aliens.length];
      this.entities.push(alien);
    }
  }

  async start() {
    const canvas = this.ctx.canvas;
    this.rectangle = new Rectangle(
      new Point(0, 0),
      canvas.width,
      canvas.height,
    );
    await this.assets.load();

    this.reset();

    document.addEventListener('keydown', (event) => {
      this.entities.filter(e => e.keydown).forEach(e => e.keydown(event.key));
      event.preventDefault();
    });

    document.addEventListener('keyup', (event) => {
      this.entities.filter(e => e.keyup).forEach(e => e.keyup(event.key));
      event.preventDefault();
    });

    canvas.addEventListener('touchstart', (event) => {
      this.entities.filter(e => e.touchstart).forEach(e => e.touchstart(event.touches[0]));
      event.preventDefault();
    });

    canvas.addEventListener('touchmove', (event) => {
      this.entities.filter(e => e.touchmove).forEach(e => e.touchmove(event.touches[0]));
      event.preventDefault();
    });

    canvas.addEventListener('touchend', (event) => {
      this.entities.filter(e => e.touchend).forEach(e => e.touchend(event.changedTouches[0]));
      event.preventDefault();
    });

    setInterval(() => {
      this.entities.filter(e => e.update).forEach(e => e.update());
      this.deleteList.forEach(d => {
        const i = this.entities.findIndex(e => e === d);
        if (i >= 0) {
          this.entities.splice(i, 1);
        }
      });
      this.deleteList = [];
    }, 1000 / this.fps);

    this.draw();
  }

  msToFrames(ms: number) {
    return Math.floor(this.fps * ms / 1000);
  }

  private draw() {
    requestAnimationFrame(() => {
      this.draw();
    });

    this.ctx.imageSmoothingEnabled = false;
    const canvas = this.ctx.canvas;
    this.ctx.drawImage(this.assets.bg, 0, 0);

    this.entities.filter(e => e.draw).forEach(e => e.draw(this.ctx));
  }
}
