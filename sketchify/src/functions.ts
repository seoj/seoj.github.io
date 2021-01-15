export function sketchify(inputImageData: ImageData) {
  const outputImageData = new ImageData(
    new Uint8ClampedArray(inputImageData.width * inputImageData.height * 4),
    inputImageData.width,
    inputImageData.height,
  );
  for (let row = 0; row < inputImageData.height; row++) {
    for (let col = 0; col < inputImageData.width; col++) {
      const inputRgba = getRgba(inputImageData, row, col);
      const rightRgba = getRgba(inputImageData, row, col + 1);
      const bottomRgba = getRgba(inputImageData, row + 1, col);

      if (!rightRgba || !bottomRgba) {
        setRgba(outputImageData, row, col, {
          r: 0,
          g: 0,
          b: 0,
          a: 0,
        });
        break;
      }

      const inputBrightness = avg(inputRgba.r, inputRgba.g, inputRgba.b);
      const rightBrightness = avg(rightRgba.r, rightRgba.g, rightRgba.b);
      const bottomBrightness = avg(bottomRgba.r, bottomRgba.g, bottomRgba.b);

      const rightBrightnessDiff = diff(inputBrightness, rightBrightness);
      const bottomBrightnessDiff = diff(inputBrightness, bottomBrightness);
      const rightRDiff = diff(inputRgba.r, rightRgba.r);
      const rightGDiff = diff(inputRgba.g, rightRgba.g);
      const rightBDiff = diff(inputRgba.b, rightRgba.b);
      const bottomRDiff = diff(inputRgba.r, bottomRgba.r);
      const bottomGDiff = diff(inputRgba.g, bottomRgba.g);
      const bottomBDiff = diff(inputRgba.b, bottomRgba.b);

      const channel = 0xff - avg(
        rightBrightnessDiff,
        bottomBrightnessDiff,
        rightRDiff,
        rightGDiff,
        rightBDiff,
        bottomRDiff,
        bottomGDiff,
        bottomBDiff,
      ) * 2;

      setRgba(outputImageData, row, col, {
        r: channel,
        g: channel,
        b: channel,
        a: 0xff,
      });
    }
  }

  return outputImageData;
}

function diff(a: number, b: number) {
  return Math.abs(a - b);
}

function avg(...args: number[]) {
  return args.reduce((a, b) => a + b, 0) / args.length;
}

function getRgba(imageData: ImageData, row: number, col: number) {
  const i = (imageData.width * row + col) * 4;
  if (i >= imageData.data.length) {
    return null;
  }
  return {
    r: imageData.data[i + 0],
    g: imageData.data[i + 1],
    b: imageData.data[i + 2],
    a: imageData.data[i + 3],
  };
}

function setRgba(imageData: ImageData, row: number, col: number, rgba) {
  const i = (imageData.width * row + col) * 4;
  imageData.data[i + 0] = rgba.r;
  imageData.data[i + 1] = rgba.g;
  imageData.data[i + 2] = rgba.b;
  imageData.data[i + 3] = rgba.a;
}
