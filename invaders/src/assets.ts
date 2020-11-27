export class Assets {
  ship: HTMLImageElement;
  alien: HTMLImageElement;

  async load() {
    this.ship = await load('assets/images/ship.png');
    this.alien = await load('assets/images/alien.png');
  }
}

function load(src: string) {
  const image = new Image();
  image.src = src;
  return new Promise<HTMLImageElement>((resolve) => {
    image.addEventListener('load', () => {
      resolve(image);
    });
  });
}
