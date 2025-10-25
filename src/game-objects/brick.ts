export class Brick {
	ctx: CanvasRenderingContext2D;
	x: number;
	y: number;
	width: number = 20;
	height: number = 20;
	color: string = "red";

	constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
		this.ctx = ctx;
		this.x = x;
		this.y = y;
	}

	draw(): void {
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}
