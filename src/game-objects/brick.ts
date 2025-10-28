export class Brick {
	ctx: CanvasRenderingContext2D;
	x: number;
	y: number;
	size: number = 100;
	color: string = "red";

	constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
		this.ctx = ctx;
		this.x = x;
		this.y = y;
	}

	draw(): void {
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(this.x, this.y, this.size, this.size);

		let borderSize = this.size * 0.25;

		this.ctx.strokeStyle = "white";

		// draw top bevel
		this.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
		this.ctx.beginPath();
		this.ctx.moveTo(this.x, this.y);
		this.ctx.lineTo(this.x + this.size, this.y);
		this.ctx.lineTo(this.x + this.size - borderSize, this.y + borderSize);
		this.ctx.lineTo(this.x + borderSize, this.y + borderSize);
		this.ctx.closePath();
		this.ctx.fill();

		// draw left bevel
		this.ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
		this.ctx.beginPath();
		this.ctx.moveTo(this.x, this.y);
		this.ctx.lineTo(this.x, this.y + this.size);
		this.ctx.lineTo(this.x + borderSize, this.y + this.size - borderSize);
		this.ctx.lineTo(this.x + borderSize, this.y + borderSize);
		this.ctx.closePath();
		this.ctx.fill();

		// draw bottom bevel
		this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
		this.ctx.beginPath();
		this.ctx.moveTo(this.x, this.y + this.size);
		this.ctx.lineTo(this.x + this.size, this.y + this.size);
		this.ctx.lineTo(
			this.x + this.size - borderSize,
			this.y + this.size - borderSize
		);
		this.ctx.lineTo(this.x + borderSize, this.y + this.size - borderSize);
		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.stroke();
	}
}
