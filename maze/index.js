const CARDINALITY = [{
    x: -1,
    y: 0
}, {
    x: 1,
    y: 0
}, {
    x: 0,
    y: -1
}, {
    x: 0,
    y: 1
}];

class Random {
    constructor() {}

    static randInt(n) {
        return parseInt(Math.random() * n);
    }
}

class Maze {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.maze = []
        for (let x = 0; x < width; x++) {
            this.maze[x] = [];
            for (let y = 0; y < height; y++) {
                this.maze[x].push(false);
            }
        }
    }

    generate() {
        let x = Random.randInt(this.width);
        let y = Random.randInt(this.height);

        let stack = [];
        stack.push({
            x,
            y
        });

        while (stack.length > 0) {
            let curr = stack.pop();
            if (this.inBound(curr) && !this.maze[curr.x][curr.y] && this.countPathNeighbors(curr) <= 1) {
                _(CARDINALITY).shuffle().forEach(cardinality => {
                    let neighbor = {
                        x: curr.x + cardinality.x,
                        y: curr.y + cardinality.y
                    };
                    if (this.inBound(neighbor)) {
                        stack.push(neighbor);
                    }
                });
                this.maze[curr.x][curr.y] = true;
            }
        }
    }

    shuffle(arr) {
        let result = [];
        return result;
    }

    countPathNeighbors(point) {
        let neighborPath = 0;
        CARDINALITY.forEach(cardinality => {
            let neighbor = {
                x: point.x + cardinality.x,
                y: point.y + cardinality.y
            };
            if (this.inBound(neighbor) && this.maze[neighbor.x][neighbor.y]) {
                neighborPath++;
            }
        });
        return neighborPath;
    }

    inBound(point) {
        return point.x >= 0 && point.x < this.width && point.y >= 0 && point.y < this.height;
    }
}

class View {
    constructor(canvas, model) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.model = model;

        window.onresize = () => {
            this.update();
        };
    }

    update() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        let resX = canvas.width / this.model.width;
        let resY = canvas.height / this.model.height;
        for (let x = 0; x < this.model.maze.length; x++) {
            let row = this.model.maze[x];
            for (let y = 0; y < row.length; y++) {
                if (row[y]) {
                    this.ctx.fillStyle = 'rgb(255,255,255)';
                } else {
                    this.ctx.fillStyle = 'rgb(0,0,0)';
                }
                this.ctx.fillRect(x * resX, y * resY, resX, resY);
            }
        }
        for (let x = 0; x < this.model.maze.length; x++) {
            let row = this.model.maze[x];
            for (let y = 0; y < row.length; y++) {
                console.log(x, y);
                if (this.model.inBound({
                        x,
                        y: y - 1
                    }) && this.model.inBound({
                        x: x + 1,
                        y
                    }) && !this.model.maze[x][y - 1] && !this.model.maze[x + 1][y]) {
                    this.ctx.moveTo(x * resX, y * resY);
                    this.ctx.lineTo((x + 1) * resX, y * resY);
                    this.ctx.lineTo((x + 1) * resX, (y + 1) * resY);
                    this.ctx.closePath();
                    this.ctx.fillStyle = 'rgb(0,0,0)';
                    this.ctx.fill();
                }
                if (this.model.inBound({
                        x: x + 1,
                        y
                    }) && this.model.inBound({
                        x,
                        y: y + 1
                    }) && !this.model.maze[x + 1][y] && !this.model.maze[x][y + 1]) {
                    this.ctx.moveTo((x + 1) * resX, y * resY);
                    this.ctx.lineTo((x + 1) * resX, (y + 1) * resY);
                    this.ctx.lineTo(x * resX, (y + 1) * resY);
                    this.ctx.closePath();
                    this.ctx.fillStyle = 'rgb(0,0,0)';
                    this.ctx.fill();
                }
                if (this.model.inBound({
                        x,
                        y: y + 1
                    }) && this.model.inBound({
                        x: x - 1,
                        y
                    }) && !this.model.maze[x][y + 1] && !this.model.maze[x - 1][y]) {
                    this.ctx.moveTo(x * resX, y * resY);
                    this.ctx.lineTo(x * resX, (y + 1) * resY);
                    this.ctx.lineTo((x + 1) * resX, (y + 1) * resY);
                    this.ctx.closePath();
                    this.ctx.fillStyle = 'rgb(0,0,0)';
                    this.ctx.fill();
                }
                if (this.model.inBound({
                        x: x - 1,
                        y
                    }) && this.model.inBound({
                        x,
                        y: y - 1
                    }) && !this.model.maze[x - 1][y] && !this.model.maze[x][y - 1]) {
                    this.ctx.moveTo(x * resX, (y + 1) * resY);
                    this.ctx.lineTo(x * resX, y * resY);
                    this.ctx.lineTo((x + 1) * resX, y * resY);
                    this.ctx.closePath();
                    this.ctx.fillStyle = 'rgb(0,0,0)';
                    this.ctx.fill();
                }
            }
        }
    }
}

var canvas = document.getElementsByTagName('canvas')[0];

var model = new Maze(30, 30);
var view = new View(canvas, model);

model.generate();
view.update();
