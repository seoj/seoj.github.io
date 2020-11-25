import { Point } from "./point";

export enum Direction {
  up = 1,
  down = 2,
  left = 3,
  right = 4,
}

export const offsets = {
  [Direction.up]: new Point(0, -1),
  [Direction.down]: new Point(0, 1),
  [Direction.left]: new Point(-1, 0),
  [Direction.right]: new Point(1, 0),
};

export const opposites = {
  [Direction.up]: Direction.down,
  [Direction.down]: Direction.up,
  [Direction.left]: Direction.right,
  [Direction.right]: Direction.left,
}