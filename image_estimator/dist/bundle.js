(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chromosome = void 0;
const constants_1 = require("./constants");
const rand_1 = require("./rand");
const triangle_1 = require("./triangle");
class Chromosome {
    constructor() {
        this.triangles = [];
    }
    static create(...args) {
        if (args.length === 0) {
            return new Chromosome();
        }
        if (args.length === 1) {
            if (args[0] instanceof Chromosome) {
                const other = args[0];
                const chromosome = new Chromosome();
                for (const triangle of other.triangles) {
                    chromosome.triangles.push(triangle_1.Triangle.create(triangle));
                }
                return chromosome;
            }
        }
    }
    mutate() {
        if (Math.random() < constants_1.mutationRate) {
            const newLength = this.triangles.length + rand_1.randSign();
            if (newLength > 0) {
                if (newLength < this.triangles.length) {
                    this.triangles = this.triangles.slice(0, newLength);
                }
                else {
                    this.triangles.push(triangle_1.Triangle.create());
                }
            }
        }
        for (const triangle of this.triangles) {
            triangle.mutate();
        }
        return this;
    }
}
exports.Chromosome = Chromosome;

},{"./constants":2,"./rand":5,"./triangle":7}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.height = exports.width = exports.offspringCount = exports.mutationRate = void 0;
exports.mutationRate = .1;
exports.offspringCount = 10;
exports.width = 32;
exports.height = 32;

},{}],3:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chromosome_1 = require("./chromosome");
const constants_1 = require("./constants");
const fileInput = document.getElementById('file-input');
const sourceCanvas = document.getElementById('source-canvas');
const resultCanvas = document.getElementById('result-canvas');
const offspringCanvas = document.createElement('canvas');
const output = document.getElementById('output');
sourceCanvas.width = resultCanvas.width = offspringCanvas.width = constants_1.width;
sourceCanvas.height = resultCanvas.height = offspringCanvas.height = constants_1.height;
let intervalHandle = 0;
let sourceImageData;
fileInput.addEventListener('input', () => __awaiter(void 0, void 0, void 0, function* () {
    stop();
    const file = fileInput.files[0];
    fileInput.value = null;
    const image = yield toImage(file);
    const ctx = sourceCanvas.getContext('2d');
    ctx.clearRect(0, 0, constants_1.width, constants_1.height);
    ctx.drawImage(image, 0, 0, constants_1.width, constants_1.height);
    sourceImageData = ctx.getImageData(0, 0, constants_1.width, constants_1.height);
    start();
}));
function start() {
    const resultCtx = resultCanvas.getContext('2d');
    const offspringCtx = offspringCanvas.getContext('2d');
    let best = {
        chromosome: chromosome_1.Chromosome.create(),
        imageData: resultCtx.getImageData(0, 0, constants_1.width, constants_1.height),
        loss: Number.MAX_VALUE,
    };
    let generation = 0;
    intervalHandle = setInterval(() => {
        const offsprings = [];
        for (let i = 0; i < constants_1.offspringCount; i++) {
            offsprings.push(chromosome_1.Chromosome.create(best.chromosome).mutate());
        }
        for (const offspring of offsprings) {
            drawChromosome(offspringCtx, offspring);
            const offspringImageData = offspringCtx.getImageData(0, 0, constants_1.width, constants_1.height);
            const loss = diffImageData(sourceImageData, offspringImageData);
            if (loss < best.loss) {
                best.chromosome = offspring;
                best.imageData = offspringImageData;
                best.loss = loss;
            }
        }
        generation++;
        drawChromosome(resultCtx, best.chromosome);
        output.innerText = `loss: ${best.loss}\ngeneration: ${generation}\nn: ${best.chromosome.triangles.length}`;
    });
}
function diffImageData(data1, data2) {
    let diff = 0;
    for (let i = 0; i < data1.data.length; i++) {
        const v1 = data1.data[i];
        const v2 = data2.data[i];
        diff += Math.abs(v1 - v2);
    }
    return diff;
}
function drawChromosome(ctx, chromosome) {
    ctx.clearRect(0, 0, constants_1.width, constants_1.height);
    for (const triangle of chromosome.triangles) {
        ctx.beginPath();
        ctx.moveTo(triangle.p1.x, triangle.p1.y);
        ctx.lineTo(triangle.p2.x, triangle.p2.y);
        ctx.lineTo(triangle.p3.x, triangle.p3.y);
        ctx.closePath();
        ctx.fillStyle = `rgb(${triangle.rgb.r},${triangle.rgb.g},${triangle.rgb.b})`;
        ctx.fill();
    }
}
function stop() {
    clearInterval(intervalHandle);
}
function toImage(blob) {
    return new Promise((resolve) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(blob);
        fileReader.onload = () => {
            const dataURL = fileReader.result;
            const image = new Image();
            image.src = dataURL;
            image.onload = () => {
                resolve(image);
            };
        };
    });
}

},{"./chromosome":1,"./constants":2}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
const constants_1 = require("./constants");
const rand_1 = require("./rand");
class Point {
    constructor(x = rand_1.randInt(constants_1.width), y = rand_1.randInt(constants_1.height)) {
        this.x = x;
        this.y = y;
    }
    static create(...args) {
        if (args.length === 0) {
            return new Point();
        }
        if (args.length === 1) {
            if (args[0] instanceof Point) {
                const other = args[0];
                return new Point(other.x, other.y);
            }
        }
    }
    mutate() {
        if (Math.random() < constants_1.mutationRate) {
            this.x += rand_1.randSign();
            this.x = Math.min(this.x, constants_1.width);
            this.x = Math.max(this.x, 0);
        }
        if (Math.random() < constants_1.mutationRate) {
            this.y += rand_1.randSign();
            this.y = Math.min(this.y, constants_1.height);
            this.y = Math.max(this.y, 0);
        }
    }
}
exports.Point = Point;

},{"./constants":2,"./rand":5}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randInt = exports.randSign = void 0;
function randSign() {
    return Math.random() < .5 ? 1 : -1;
}
exports.randSign = randSign;
function randInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min) + min);
}
exports.randInt = randInt;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rgb = void 0;
const constants_1 = require("./constants");
const rand_1 = require("./rand");
class Rgb {
    constructor(r = rand_1.randInt(0xff), g = rand_1.randInt(0xff), b = rand_1.randInt(0xff)) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    static create(...args) {
        if (args.length === 0) {
            return new Rgb();
        }
        if (args.length === 1) {
            if (args[0] instanceof Rgb) {
                const other = args[0];
                return new Rgb(other.r, other.g, other.b);
            }
        }
    }
    mutate() {
        if (Math.random() < constants_1.mutationRate) {
            this.r += rand_1.randSign();
            this.r = Math.min(this.r, 255);
            this.r = Math.max(this.r, 0);
        }
        if (Math.random() < constants_1.mutationRate) {
            this.g += rand_1.randSign();
            this.g = Math.min(this.g, 255);
            this.g = Math.max(this.g, 0);
        }
        if (Math.random() < constants_1.mutationRate) {
            this.b += rand_1.randSign();
            this.b = Math.min(this.b, 255);
            this.b = Math.max(this.b, 0);
        }
    }
}
exports.Rgb = Rgb;

},{"./constants":2,"./rand":5}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = void 0;
const point_1 = require("./point");
const rgb_1 = require("./rgb");
class Triangle {
    constructor(p1, p2, p3, rgb) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.rgb = rgb;
    }
    static create(...args) {
        if (args.length === 0) {
            return new Triangle(point_1.Point.create(), point_1.Point.create(), point_1.Point.create(), rgb_1.Rgb.create());
        }
        if (args.length === 1) {
            if (args[0] instanceof Triangle) {
                const other = args[0];
                return new Triangle(point_1.Point.create(other.p1), point_1.Point.create(other.p2), point_1.Point.create(other.p3), rgb_1.Rgb.create(other.rgb));
            }
        }
    }
    mutate() {
        this.p1.mutate();
        this.p2.mutate();
        this.p3.mutate();
        this.rgb.mutate();
    }
}
exports.Triangle = Triangle;

},{"./point":4,"./rgb":6}]},{},[3]);
