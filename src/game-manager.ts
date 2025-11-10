import { BRICK_SIZE } from "./constants";
import { GameBoard } from "./game-objects/game-board";
import { PatternSlot } from "./game-objects/pattern-slot";
import { Point } from "./game-objects/point";

export class GameManager {
	private board: GameBoard;
	private boardPadding = {
		top: 100,
		bottom: 50,
	};

	private slotAlpha!: PatternSlot;
	private slotBeta!: PatternSlot;
	private slotCharlie!: PatternSlot;

	constructor(
		private readonly ctx: CanvasRenderingContext2D,
		private readonly canvas: HTMLCanvasElement
	) {
		this.board = new GameBoard(ctx, canvas.width / 2, this.boardPadding.top);

		let pointBeta = new Point(
			canvas.width / 2 - BRICK_SIZE * 2,
			this.boardPadding.top + BRICK_SIZE * 8 + this.boardPadding.bottom
		);
		this.slotBeta = new PatternSlot(this.ctx, pointBeta);
	}

	public draw(): void {
		const { board, slotBeta } = this;

		board.draw();
		slotBeta.brickSet.draw();
	}

	public update(timestamp: number): void {}
}
