import { BRICK_SIZE } from "../constants";

export class Brick {
	size: number = BRICK_SIZE;

	constructor(
		private readonly ctx: CanvasRenderingContext2D,
		public x: number,
		public y: number,
        public readonly color: string = "red"
	) {}

	public draw(): void {
		// destructure this into variables
		const { ctx, x, y, size, color } = this;

		ctx.fillStyle = color;
		ctx.fillRect(x, y, size, size);

		let borderSize = size * 0.15;

		ctx.strokeStyle = "white";

		// draw top bevel
		ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x + size, y);
		ctx.lineTo(x + size - borderSize, y + borderSize);
		ctx.lineTo(x + borderSize, y + borderSize);
		ctx.closePath();
		ctx.fill();

		// draw left bevel
		ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x, y + size);
		ctx.lineTo(x + borderSize, y + size - borderSize);
		ctx.lineTo(x + borderSize, y + borderSize);
		ctx.closePath();
		ctx.fill();

		// draw bottom bevel
		ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
		ctx.beginPath();
		ctx.moveTo(x, y + size);
		ctx.lineTo(x + size, y + size);
		ctx.lineTo(x + size - borderSize, y + size - borderSize);
		ctx.lineTo(x + borderSize, y + size - borderSize);
		ctx.closePath();
		ctx.fill();

		// draw right bevel
		ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
		ctx.beginPath();
		ctx.moveTo(x + size, y);
		ctx.lineTo(x + size, y + size);
		ctx.lineTo(x + size - borderSize, y + size - borderSize);
		ctx.lineTo(x + size - borderSize, y + borderSize);

		ctx.closePath();
		ctx.fill();
	}
}
