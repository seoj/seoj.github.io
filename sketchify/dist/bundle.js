(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const dim = 320;
const fileInput = document.getElementById('file-input');
const inputCanvas = document.getElementById('input-canvas');
const outputCanvas = document.getElementById('output-canvas');
const inputCtx = inputCanvas.getContext('2d');
const outputCtx = outputCanvas.getContext('2d');
inputCanvas.width = outputCanvas.width = dim;
inputCanvas.height = outputCanvas.height = dim;
fileInput.addEventListener('input', () => {
    const file = fileInput.files[0];
    fileInput.value = null;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
        const image = new Image();
        image.src = fileReader.result;
        image.onload = () => {
            inputCtx.drawImage(image, 0, 0, dim, dim);
            drawOutputImage();
        };
    };
});
function drawOutputImage() {
    const inputImageData = inputCtx.getImageData(0, 0, dim, dim).data;
    const outputImageData = [];
    for (let row = 0; row < dim; row++) {
        outputImageData.push(0xff, 0xff, 0xff, 0xff);
        for (let col = 0; col < dim - 1; col++) {
            const b1 = getBrightness(inputImageData, row, col);
            const b2 = getBrightness(inputImageData, row, col + 1);
            const diff = (1 - Math.abs(b1 - b2)) * 0xff;
            outputImageData.push(diff, diff, diff, 0xff);
        }
    }
    outputCtx.putImageData(new ImageData(new Uint8ClampedArray(outputImageData), dim, dim), 0, 0);
}
function getBrightness(imageData, row, col) {
    const i = (row * dim + col) * 4;
    const r = imageData[i + 0];
    const g = imageData[i + 1];
    const b = imageData[i + 2];
    return (r + g + b) / 3 / 0xff;
}

},{}]},{},[1]);
