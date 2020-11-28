import { Bullet } from "./bullet";
import { Explosion } from "./explosion";
import { Game } from "./game";
import { OnDraw, OnUpdate } from "./lifecycle";
import { Point } from "./point";
import { Rectangle } from "./rectangle";
import { pickRand, rand } from "./utils";

export class Alien implements OnUpdate, OnDraw {
  rectangle = new Rectangle(
    new Point(0, 0),
    16,
    16,
  );
  vx = 0;
  vy = 0;
  cooldown = 0;
  image: HTMLImageElement;

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
    ctx.drawImage(this.image, position.x, position.y);
  }

  die() {
    const explosion = new Explosion(this.game);
    explosion.position = this.rectangle.position;
    this.game.entities.push(explosion);
    this.game.deleteList.push(this);
  }
}
