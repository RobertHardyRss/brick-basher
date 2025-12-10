import { BRICK_SIZE } from "../constants";
import { BrickSet } from "./brick-set";
import { Point } from "./point";

const letterPointMap: Array<Point> = [
	new Point(BRICK_SIZE * 0, BRICK_SIZE * 0),
	new Point(BRICK_SIZE * 1, BRICK_SIZE * 0),
	new Point(BRICK_SIZE * 2, BRICK_SIZE * 0),
	new Point(BRICK_SIZE * 3, BRICK_SIZE * 0),
	new Point(BRICK_SIZE * 4, BRICK_SIZE * 0),

	new Point(BRICK_SIZE * 0, BRICK_SIZE * 1),
	new Point(BRICK_SIZE * 1, BRICK_SIZE * 1),
	new Point(BRICK_SIZE * 2, BRICK_SIZE * 1),
	new Point(BRICK_SIZE * 3, BRICK_SIZE * 1),
	new Point(BRICK_SIZE * 4, BRICK_SIZE * 1),

	new Point(BRICK_SIZE * 0, BRICK_SIZE * 2),
	new Point(BRICK_SIZE * 1, BRICK_SIZE * 2),
	new Point(BRICK_SIZE * 2, BRICK_SIZE * 2),
	new Point(BRICK_SIZE * 3, BRICK_SIZE * 2),
	new Point(BRICK_SIZE * 4, BRICK_SIZE * 2),

	new Point(BRICK_SIZE * 0, BRICK_SIZE * 3),
	new Point(BRICK_SIZE * 1, BRICK_SIZE * 3),
	new Point(BRICK_SIZE * 2, BRICK_SIZE * 3),
	new Point(BRICK_SIZE * 3, BRICK_SIZE * 3),
	new Point(BRICK_SIZE * 4, BRICK_SIZE * 3),

	new Point(BRICK_SIZE * 0, BRICK_SIZE * 4),
	new Point(BRICK_SIZE * 1, BRICK_SIZE * 4),
	new Point(BRICK_SIZE * 2, BRICK_SIZE * 4),
	new Point(BRICK_SIZE * 3, BRICK_SIZE * 4),
	new Point(BRICK_SIZE * 4, BRICK_SIZE * 4),
];

export class BrickLetterSet extends BrickSet {
	constructor(
		protected readonly ctx: CanvasRenderingContext2D,
		public x: number,
		public y: number,
		public pos: Array<number> = []
	) {
		super(ctx, x, y, pos, letterPointMap);
	}
}
