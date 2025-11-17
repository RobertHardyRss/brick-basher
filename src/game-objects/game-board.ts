import { BOARD_COLOR, BRICK_SIZE } from "../constants";
import { Brick } from "./brick";
import type { BrickSet } from "./brick-set";
import { Point } from "./point";

export class GameBoard {
	color: string = BOARD_COLOR;
	rows: number = 8;
	cols: number = 8;
	private readonly x: number;
	public cells: Array<Brick> = [];
	public slots: Array<BoardSlot> = [];
	public targetSlots: Array<number> = [];
	public targetColSlots: Array<number> = [];
	public targetRowSlots: Array<number> = [];

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
		const { rows, cols, x, y, ctx, cells, slots } = this;

		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < cols; col++) {
				let bx = x + BRICK_SIZE * col;
				let by = y + BRICK_SIZE * row;
				let cell = new Brick(ctx, bx, by, BOARD_COLOR);
				cells.push(cell);
				slots.push(new BoardSlot(new Point(bx, by), null));
			}
		}
	}

	public draw(): void {
		this.cells.forEach((c) => {
			c.draw();
		});

		this.slots.forEach((s) => {
			s.brick?.draw();
		});
	}

	public highlightBrickSet(brickSet: BrickSet) {
		const { cells, slots } = this;

		this.targetSlots = [];
		this.targetColSlots = [];
		this.targetRowSlots = [];

		cells.forEach((c, idx) => {
			c.highlight(null);
			this.slots[idx].brick?.highlight(null);

			brickSet.bricks.forEach((b) => {
				if (slots[idx].brick === null && b.isOverOther(c)) {
					this.targetSlots.push(idx);
				}
			});
		});

		if (this.targetSlots.length === brickSet.bricks.length) {
			this.targetSlots.forEach((s) => {
				cells[s].highlight(brickSet.color);
			});

			// since we have target slots, see if we have any rows
			// or columns that are complete

			// start with rows
			for (let row = 0; row < this.rows; row++) {
				let slotsFilled = [];
				for (let col = 0; col < this.cols; col++) {
					// set an index for the slot we want to check
					const idx = col + col * row;
					if (slots[idx].brick !== null || this.targetSlots.includes(idx)) {
						slotsFilled.push(idx);
					}
				}

				if (slotsFilled.length === this.rows) {
					this.targetRowSlots = this.targetRowSlots.concat(slotsFilled);
				}
			}

			this.targetRowSlots.forEach((s) => {
				slots[s].brick?.highlight(brickSet.color);
			});

			for (let col = 0; col < this.cols; col++) {
				let slotsFilled = [];
				for (let row = 0; row < this.rows; row++) {
					// set an index for the slot we want to check
					const idx = row * this.cols + col;
					if (slots[idx].brick !== null || this.targetSlots.includes(idx)) {
						slotsFilled.push(idx);
					}
				}

				if (slotsFilled.length === this.cols) {
					this.targetColSlots = this.targetColSlots.concat(slotsFilled);
				}
			}
			this.targetColSlots.forEach((s) => {
				slots[s].brick?.highlight(brickSet.color);
			});
		} else {
			this.targetSlots = [];
		}
	}
}

class BoardSlot {
	constructor(public point: Point, public brick: Brick | null) {}

	public setBrick(brick: Brick): void {
		this.brick = brick;
		this.brick.x = this.point.x;
		this.brick.y = this.point.y;
	}

	public clearBrick(): void {
		this.brick = null;
	}
}
