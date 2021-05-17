/** @type {HTMLInputElement} */
const fileInput = document.getElementById('file-input');
/** @type {HTMLCanvasElement} */
const referenceCanvas = document.getElementById('reference-canvas');
/** @type {HTMLVideoElement} */
const actualVideo = document.getElementById('actual-video');
/** @type {HTMLCanvasElement} */
const actualCanvas = document.getElementById('actual-canvas');
/** @type {HTMLCanvasElement} */
const overlayCanvas = document.getElementById('overlay-canvas');
/** @type {HTMLImageElement} */
const photoImg = document.getElementById('photo-img');

const referenceCtx = referenceCanvas.getContext('2d');
const actualCtx = actualCanvas.getContext('2d');
const overlayCtx = overlayCanvas.getContext('2d');
const referenceImage = new Image();

navigator.getUserMedia(
  {
    video: true,
  },
  (stream) => {
    actualVideo.srcObject = stream;
    actualVideo.autoplay = true;
    animationFrame();
  },
  (e) => {
    console.error(e);
  },
);

function animationFrame() {
  requestAnimationFrame(() => {
    animationFrame();
  });

  actualCanvas.width = overlayCanvas.width = actualVideo.videoWidth;
  actualCanvas.height = overlayCanvas.height = actualVideo.videoHeight;

  actualCtx.drawImage(actualVideo, 0, 0);
  overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
  overlayCtx.drawImage(referenceImage, 0, 0);
  overlayCtx.globalCompositeOperation = 'difference';
  overlayCtx.drawImage(actualVideo, 0, 0);
}

fileInput.addEventListener('input', () => {
  const file = fileInput.files[0];
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = () => {
    /** @type {string} */
    const result = fileReader.result;
    referenceImage.src = result;
    referenceImage.onload = () => {
      referenceCtx.drawImage(referenceImage, 0, 0);
    };
  };
});
