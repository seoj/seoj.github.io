import { Bullet } from "./bullet";
import { Game } from "./game";
import { OnDraw, OnUpdate } from "./lifecycle";
import { Point } from "./point";
import { Rectangle } from "./rectangle";
import { rand } from "./utils";

export class Alien implements OnUpdate, OnDraw {
  rectangle = new Rectangle(
    new Point(0, 0),
    16,
    16,
  );
  vx = 0;
  vy = 0;
  cooldown = 0;

  private resetCooldown() {
    this.cooldown = this.game.msToFrames(500);
  }

  constructor(
    private readonly game: Game,
  ) {
    this.rectangle.position.x = rand(0, this.game.rectangle.width - this.rectangle.width);
    const r = rand(0, Math.PI * 2);
    this.vx = Math.cos(r);
    this.vy = Math.sin(r);
    this.resetCooldown();
  }

  update() {
    const rectangle = this.rectangle;
    const position = rectangle.position;

    if (this.cooldown === 0 && rand(0, 1) < .01) {
      const bullet = new Bullet(this, this.game);
      bullet.vy = 2;
      bullet.rectangle.position.x = this.rectangle.center.x - bullet.rectangle.width / 2;
      bullet.rectangle.position.y = this.rectangle.center.y - bullet.rectangle.height;
      this.game.entities.push(bullet);
      this.resetCooldown();
    }

    if (position.x < 0 || position.x + rectangle.width > this.game.rectangle.width) {
      this.vx = -this.vx;
    }
    if (position.y < 0 || position.y + rectangle.height > this.game.rectangle.height) {
      this.vy = -this.vy;
    }

    position.x += this.vx;
    position.y += this.vy;

    if (this.cooldown > 0) {
      this.cooldown--;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const position = this.rectangle.position;
    ctx.drawImage(this.game.assets.alien, position.x, position.y);
  }

  die() {
    this.game.deleteList.push(this);
  }
}
