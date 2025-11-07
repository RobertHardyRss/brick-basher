import { GameBoard } from "./game-objects/game-board";

export class GameManager {
	private board: GameBoard;
	private boardPadding = {
		top: 100,
		bottom: 50,
	};

	constructor(
		private readonly ctx: CanvasRenderingContext2D,
		private readonly canvas: HTMLCanvasElement
	) {
		this.board = new GameBoard(ctx, canvas.width / 2, this.boardPadding.top);
	}

	public draw(): void {
		const { board } = this;

		board.draw();
	}

	public update(timestamp: number): void {}
}
