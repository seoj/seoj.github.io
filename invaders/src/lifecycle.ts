export interface OnUpdate {
  update(): void;
}

export interface OnDraw {
  draw(ctx: CanvasRenderingContext2D): void;
}

export interface OnKeydown {
  keydown(key: string): void;
}

export interface OnKeyup {
  keyup(key: string): void;
}
