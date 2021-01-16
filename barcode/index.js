const output = document.getElementById('output');
const error = document.getElementById('error');
/** @type {HTMLInputElement} */
const fileInput = document.getElementById('file-input');
const supportedFormats = document.getElementById('supported-formats');

async function main() {
  supportedFormats.innerText = `${await BarcodeDetector.getSupportedFormats()}`;
}

main();

fileInput.addEventListener('input', async () => {
  output.innerText = 'working...';
  try {
    const image = await toImage(fileInput.files[0]);
    output.innerText = 'image loaded. scanning for barcode...';

    const barcodeDetector = new BarcodeDetector();
    const detectedBarcodeList = await barcodeDetector.detect(image);

    output.innerText = `done: ${JSON.stringify(detectedBarcodeList, null, 2)}`;
  } catch (e) {
    error.innerText = `${e}`;
  }
});

function toImage(blob) {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(blob);

  return new Promise((resolve) => {
    fileReader.onload = () => {
      const image = new Image();
      image.src = fileReader.result;
      image.onload = () => {
        resolve(image);
      };
    };
  });
}