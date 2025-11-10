import { patternSets } from "../pattern-sets";
import { BrickSet } from "./brick-set";
import { Point } from "./point";

export class PatternSlot {
	public brickSet!: BrickSet;

	constructor(
		private readonly ctx: CanvasRenderingContext2D,
		public point: Point
	) {
		this.generateSet();
	}

	public generateSet() {
		let { ctx, point } = this;

		const idx = Math.floor(Math.random() * patternSets.length);
		const pattern = patternSets[idx];

		this.brickSet = new BrickSet(ctx, point.x, point.y, pattern);
	}
}
