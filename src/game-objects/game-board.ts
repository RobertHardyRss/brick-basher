import { BOARD_COLOR, BRICK_SIZE } from "../constants";
import { Brick } from "./brick";

export class GameBoard {
	color: string = BOARD_COLOR;
	rows: number = 8;
	cols: number = 8;
	private readonly x: number;
	private cells: Array<Brick> = [];

	constructor(
		private readonly ctx: CanvasRenderingContext2D,
		x: number,
		private readonly y: number
	) {
		let width = this.rows * BRICK_SIZE;
		this.x = x - width / 2;
		this.initGrid();
	}

	private initGrid() {
		const { rows, cols, x, y, ctx, cells } = this;

		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < cols; col++) {
				let bx = x + BRICK_SIZE * col;
				let by = y + BRICK_SIZE * row;
				let cell = new Brick(ctx, bx, by, BOARD_COLOR);
				cells.push(cell);
			}
		}
	}

	public draw(): void {
		this.cells.forEach((c) => {
			c.draw();
		});
	}
}
