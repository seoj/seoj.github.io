import { Alien } from "./alien";
import { Game } from "./game";
import { OnDraw, OnUpdate } from "./lifecycle";
import { Point } from "./point";
import { Rectangle } from "./rectangle";
import { Ship } from "./ship";

export class Bullet implements OnUpdate, OnDraw {
  rectangle = new Rectangle(
    new Point(0, 0),
    2,
    2,
  );
  vx = 0;
  vy = 0;

  constructor(
    public source: any,
    private readonly game: Game,
  ) { }

  update() {
    const position = this.rectangle.position;

    if (position.x < 0 || position.x > this.game.rectangle.width || position.y < 0 || position.y > this.game.rectangle.height) {
      this.remove();
      return;
    }

    if (this.source instanceof Ship) {
      for (const entity of this.game.entities) {
        if (entity instanceof Alien && this.rectangle.intersects(entity.rectangle)) {
          entity.die();
          this.remove();
          return;
        }
      }
    }

    if (this.source instanceof Alien) {
      for (const entity of this.game.entities) {
        if (entity instanceof Ship && this.rectangle.intersects(entity.rectangle)) {
          entity.die();
          this.remove();
          return;
        }
      }
    }

    position.x += this.vx;
    position.y += this.vy;
  }

  private remove() {
    this.game.deleteList.push(this);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(
      this.rectangle.position.x,
      this.rectangle.position.y,
      this.rectangle.width,
      this.rectangle.height,
    );
  }
}