import { sketchify } from './functions';

const maxDim = 320;

const fileInput = document.getElementById('file-input') as HTMLInputElement;
const inputCanvas = document.getElementById('input-canvas') as HTMLCanvasElement;
const outputCanvas = document.getElementById('output-canvas') as HTMLCanvasElement;

const inputCtx = inputCanvas.getContext('2d');
const outputCtx = outputCanvas.getContext('2d');

fileInput.addEventListener('input', async () => {
  onFileInput(fileInput);
});

async function onFileInput(fileInput: HTMLInputElement) {
  const file = fileInput.files[0];
  fileInput.value = null;
  const image = await toImage(file);
  const ratio = maxDim / Math.max(image.width, image.height);
  inputCanvas.width = outputCanvas.width = image.width * ratio;
  inputCanvas.height = outputCanvas.height = image.height * ratio;
  inputCtx.drawImage(image, 0, 0, inputCanvas.width, inputCanvas.height);
  drawOutputImage();
}

function toImage(blob: Blob) {
  return new Promise<HTMLImageElement>((resolve) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(blob);
    fileReader.onload = () => {
      const image = new Image();
      image.src = fileReader.result as string;
      image.onload = () => {
        resolve(image);
      };
    };
  });
}

function drawOutputImage() {
  outputCtx.putImageData(sketchify(inputCtx.getImageData(0, 0, inputCanvas.width, inputCanvas.height)), 0, 0);
}