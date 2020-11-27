import { Alien } from "./alien";
import { Bullet } from "./bullet";
import { Game } from "./game";
import { OnDraw, OnKeydown, OnKeyup, OnUpdate } from "./lifecycle";
import { Point } from "./point";
import { Rectangle } from "./rectangle";

export class Ship implements OnUpdate, OnDraw, OnKeydown, OnKeyup {
  rectangle: Rectangle;
  keydownList = new Set<string>();
  touch: Touch;
  cooldown = 0;

  private resetCooldown() {
    this.cooldown = this.game.msToFrames(250);
  }

  constructor(
    private readonly game: Game,
  ) {
    const width = 16;
    const height = 16;
    this.rectangle = new Rectangle(
      new Point(
        this.game.rectangle.center.x - width / 2,
        this.game.rectangle.height - height,
      ),
      width,
      height,
    );
  }

  update() {
    if (this.game.entities.filter(e => e instanceof Alien).length === 0) {
      alert('You win!');
      this.game.reset();
    }

    const position = this.rectangle.position;
    if (this.keydownList.has('w')) {
      position.y--;
    }
    if (this.keydownList.has('s')) {
      position.y++;
    }
    if (this.keydownList.has('a')) {
      position.x--;
    }
    if (this.keydownList.has('d')) {
      position.x++;
    }
    if (this.keydownList.has(',')) {
      this.fire();
    }
    if (this.touch) {
      this.fire();
      const touchX = this.touch.pageX - (this.touch.target as HTMLElement).offsetLeft;
      const touchY = this.touch.pageY - (this.touch.target as HTMLElement).offsetTop;
      const diffX = touchX - position.x;
      const diffY = touchY - position.y;
      let r = Math.atan(diffY / diffX);
      if (diffX < 0) {
        r += Math.PI;
      }
      position.x += Math.cos(r);
      position.y += Math.sin(r);
    }
    if (this.cooldown > 0) {
      this.cooldown--;
    }
  }

  private fire() {
    if (this.cooldown === 0) {
      const bullet = new Bullet(this, this.game);
      bullet.vy = -2;
      const position = bullet.rectangle.position;
      const center = this.rectangle.center;
      position.x = center.x - bullet.rectangle.width / 2;
      position.y = center.y;
      this.game.entities.push(bullet);
      this.resetCooldown();
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const position = this.rectangle.position;
    ctx.drawImage(this.game.assets.ship, position.x, position.y);
  }

  keydown(key: string) {
    this.keydownList.add(key);
  }

  keyup(key: string) {
    this.keydownList.delete(key);
  }

  touchstart(touch: Touch) {
    this.touch = touch;
  }

  touchmove(touch: Touch) {
    this.touch = touch;
  }

  touchend(touch: Touch) {
    this.touch = null;
  }

  die() {
    alert('Game over!');
    this.game.reset();
  }
}
