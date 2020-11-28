export class Assets {
  bg: HTMLImageElement;
  ship: HTMLImageElement;
  aliens: HTMLImageElement[] = [];
  explosion: HTMLImageElement;

  async load() {
    this.bg = await load('assets/images/background.png');
    this.ship = await load('assets/images/ship.png');
    this.aliens.push(await load('assets/images/alien0.png'));
    this.aliens.push(await load('assets/images/alien1.png'));
    this.aliens.push(await load('assets/images/alien2.png'));
    this.aliens.push(await load('assets/images/alien3.png'));
    this.explosion = await load('assets/images/explosion.png');
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
