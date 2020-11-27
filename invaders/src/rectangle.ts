import { Point } from "./point";

export class Rectangle {
  constructor(
    public position: Point,
    public width: number,
    public height: number,
  ) { }

  get center() {
    return new Point(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2,
    );
  }

  intersects(other: Rectangle) {
    return this.position.x < other.position.x + other.width &&
      this.position.x + this.width > other.position.x &&
      this.position.y < other.position.y + other.height &&
      this.position.y + this.height > other.position.y;
  }
}
