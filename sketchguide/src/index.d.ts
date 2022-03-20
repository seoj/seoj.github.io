declare const canvas: HTMLCanvasElement;
declare const imageFileInput: HTMLInputElement;
declare const fullscreenButton: HTMLButtonElement;
declare const ctx: CanvasRenderingContext2D;
declare let image: HTMLImageElement;
declare function update(): void;
declare function drawLine(x1: number, y1: number, x2: number, y2: number): void;
declare function toHTMLImageElement(blob: Blob): Promise<HTMLImageElement>;
