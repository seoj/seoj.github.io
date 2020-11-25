const canvas = document.querySelector('canvas');
export class View {
    constructor(model) {
        this.model = model;
    }
    update() {
        const cellWidth = canvas.width / this.model.gridWidth;
        const cellHeight = canvas.height / this.model.gridHeight;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (this.model.foodPosition) {
            const position = this.model.foodPosition;
            ctx.fillStyle = 'red';
            drawCell(ctx, position.x, position.y, cellWidth, cellHeight);
        }
        ctx.fillStyle = 'green';
        for (const point of this.model.snakePositions) {
            drawCell(ctx, point.x, point.y, cellWidth, cellHeight);
        }
        if (this.model.gameOver) {
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = `48px VT323`;
            ctx.fillStyle = 'white';
            ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
        }
    }
}
function drawCell(ctx, x, y, w, h) {
    ctx.fillRect(Math.floor(x * w), Math.floor(y * h), Math.ceil(w), Math.ceil(h));
}
