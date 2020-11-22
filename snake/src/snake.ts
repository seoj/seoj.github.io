import { Point } from "./point";

export type Direction = 'up' | 'down' | 'left' | 'right';

const directionOffsets: Record<Direction, Point> = {
  'up': new Point(-1, 0),
  'down': new Point(1, 0),
  'left': new Point(0, -1),
  'right': new Point(0, 1),
};

const directionOpposites: Record<Direction, Direction> = {
  'up': 'down',
  'down': 'up',
  'left': 'right',
  'right': 'left',
};

export class Snake {
  points: Point[] = [];
  direction: Direction = 'up';

  constructor() { }

  setDirection(direction: Direction) {
    if (directionOpposites[this.direction] !== direction) {
      this.direction = direction;
    }
  }

  contains(point: Point) {
    return this.points.some(e => e.equals(point));
  }

  next() {
    const next = this.points[0].add(directionOffsets[this.direction]);
    this.points.unshift(next);
    this.points = this.points.slice(0, -1);
  }

  increment() {
    this.points = [...this.points, this.points[this.points.length - 1]];
  }
}
