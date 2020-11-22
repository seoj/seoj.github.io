export class Point {
  constructor(
    readonly row: number,
    readonly col: number,
  ) { }

  equals(other: Point) {
    return this.row === other.row && this.col === other.col;
  }

  add(other: Point) {
    return new Point(this.row + other.row, this.col + other.col);
  }
}
