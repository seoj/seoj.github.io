(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const input = document.getElementById('input');
const canvas = document.getElementById('canvas');
const output = document.getElementById('output');
const ctx = canvas.getContext('2d');
const barcode = new BarcodeDetector();
input.addEventListener('input', () => {
    const file = input.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
        const image = new Image();
        image.src = fileReader.result;
        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            barcode.detect(imageData).then((results) => {
                for (const result of results) {
                    const { x, y, width, height } = result.boundingBox;
                    ctx.strokeStyle = '#ff0000';
                    ctx.lineWidth = 8;
                    ctx.strokeRect(x, y, width, height);
                }
                output.innerText = JSON.stringify(results, null, 2);
            });
        };
    };
});

},{}]},{},[1]);
