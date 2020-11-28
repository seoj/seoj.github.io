import { Game } from "./game";
import { OnDraw, OnUpdate } from "./lifecycle";
import { Point } from "./point";

export class Explosion implements OnUpdate, OnDraw {
  ttl = 30;
  position: Point;

  constructor(
    private readonly game: Game,
  ) { }

  update() {
    if (this.ttl === 0) {
      this.game.deleteList.push(this);
    }
    this.ttl--;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.game.assets.explosion, this.position.x, this.position.y);
  }
}
