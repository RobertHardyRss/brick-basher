import { BRICK_SIZE } from "../constants";
import { Point } from "./point";

export class Brick {
	size: number = BRICK_SIZE;
	public highlightColor: string | null = null;

	constructor(
		private readonly ctx: CanvasRenderingContext2D,
		public x: number,
		public y: number,
		public readonly color: string = "red"
	) {}

	public draw(): void {
		// destructure this into variables
		const { ctx, x, y, size, color, highlightColor } = this;

		ctx.fillStyle = highlightColor ?? color;
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

	public isPointOver(point: Point): boolean {
		const { ctx, x, y, size } = this;
		const path = new Path2D();
		path.rect(x, y, size, size);

		return ctx.isPointInPath(path, point.x, point.y);
	}

	public center(): Point {
		const { x, y, size } = this;
		return new Point(x + size, y + size);
	}

	public IsOverOther(other: Brick): boolean {
		return other.isPointOver(this.center());
	}

	public HighlightOtherIfOver(other: Brick) {
		if (this.IsOverOther(other)) {
			other.highlightColor = this.color;
		}
	}
}
