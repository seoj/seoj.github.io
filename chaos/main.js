const params = [];

for (let i = 0; i < 24; i++) {
  params.push(Math.floor(Math.random() * 3) - 1);
}

const maxIterations = 5000;

function doit(t) {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const minX = -2;
  const minY = -2;
  const maxX = 2;
  const maxY = 2;

  const rx = canvas.width / (maxX - minX);
  const ry = canvas.height / (maxY - minY)

  let x = t;
  let y = t;

  let prevX = null;
  let prevY = null;

  for (let i = 0; i < maxIterations; i++) {
    const xx = x * x;
    const xy = x * y;
    const xt = x * t;

    const yx = y * x;
    const yy = y * y;
    const yt = y * t;

    const tx = t * x;
    const ty = t * y;
    const tt = t * t;

    let x2 =
      params[0] * x +
      params[1] * xx +
      params[2] * xy +
      params[3] * xt +
      params[4] * y +
      params[5] * yx +
      params[6] * yy +
      params[7] * yt +
      params[8] * t +
      params[9] * tx +
      params[10] * ty +
      params[11] * tt;

    y =
      params[12] * x +
      params[13] * xx +
      params[14] * xy +
      params[15] * xt +
      params[16] * y +
      params[17] * yx +
      params[18] * yy +
      params[19] * yt +
      params[20] * t +
      params[21] * tx +
      params[22] * ty +
      params[23] * tt;
    x = x2;

    const a = x * rx + (canvas.width / 2);
    const b = (canvas.height / 2) - y * ry;


    // if (i === 0) {
    ctx.fillStyle = getColor(i);
    ctx.fillRect(a, b, 1, 1);
    // }
    // else {
    //   ctx.beginPath();
    //   ctx.strokeStyle = getColor(i);
    //   ctx.moveTo(prevX, prevY);
    //   ctx.lineTo(a, b);
    //   ctx.stroke();
    // }

    // prevX = a;
    // prevY = b;
  }
}

function getColor(i) {
  return `hsla(${i / maxIterations * 360},100%,75%,${i / maxIterations})`;
}

class MainCtrl {
  constructor($element) {
    this.t = 0;

    this.render();
  }

  render() {
    doit(this.t);
  }
}

angular.module('chaos', ['ngMaterial'])
  .controller('MainCtrl', MainCtrl);