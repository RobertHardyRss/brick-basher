import { Brick } from "../brick";
import { BrickSetBase } from "../brick-set-base";

export class OneBrick extends BrickSetBase {
	constructor(
		protected readonly ctx: CanvasRenderingContext2D,
		public x: number,
		public y: number
	) {
		super(ctx, x, y);

        this.setColor();

        this.bricks.push(new Brick(ctx, x, y, this.color));
	}
}
