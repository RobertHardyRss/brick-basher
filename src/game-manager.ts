import { BRICK_SIZE } from "./constants";
import type { BrickSet } from "./game-objects/brick-set";
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

	private mousePosition: Point = new Point(0, 0);
	private selectedSlot: PatternSlot | null = null;

	constructor(
		private readonly ctx: CanvasRenderingContext2D,
		private readonly canvas: HTMLCanvasElement
	) {
		this.wireUpEvents();

		this.board = new GameBoard(ctx, canvas.width / 2, this.boardPadding.top);
		this.initSlots();
	}

	public draw(): void {
		const { board, slotAlpha, slotBeta, slotCharlie } = this;

		board.draw();
		slotAlpha.brickSet?.draw();
		slotBeta.brickSet?.draw();
		slotCharlie.brickSet?.draw();
		slotBeta.brickSet?.draw();
	}

	public update(elapsedTime: number): void {
		const { selectedSlot, mousePosition } = this;

		document.body.style.cursor = "default";

		if (selectedSlot) {
			document.body.style.cursor = "none";
			selectedSlot.move(this.mousePosition);
			this.board.highlightBrickSet(selectedSlot.brickSet!);
		}

		const slots = [this.slotAlpha, this.slotBeta, this.slotCharlie];

		// set mouse cursor to grab if we don't have a selected slot
		// and the mouse is over an available slot
		if (
			selectedSlot === null &&
			slots.some((s) => s.isPointOver(mousePosition))
		) {
			document.body.style.cursor = "grab";
		}

		// if all slots have been placed, generate new brick sets
		// for each one
		if (selectedSlot === null && !slots.some((s) => s.brickSet)) {
			slots.forEach((s) => s.generateSet());
		}
	}

	private initSlots() {
		let y = this.boardPadding.top + BRICK_SIZE * 8 + this.boardPadding.bottom;

		let pointBeta = new Point(this.canvas.width / 1.8 - BRICK_SIZE * 2, y);
		let pointAlpha = new Point(pointBeta.x - BRICK_SIZE * 5, y);
		let pointCharlie = new Point(pointBeta.x + BRICK_SIZE * 5, y);

		this.slotAlpha = new PatternSlot(this.ctx, pointAlpha, "alpha");
		this.slotBeta = new PatternSlot(this.ctx, pointBeta, "beta");
		this.slotCharlie = new PatternSlot(this.ctx, pointCharlie, "charlie");
	}

	private wireUpEvents() {
		this.onMouseMove = this.onMouseMove.bind(this);
		document.addEventListener("mousemove", this.onMouseMove);

		this.onClick = this.onClick.bind(this);
		document.addEventListener("click", this.onClick);
	}

	private onMouseMove(event: MouseEvent): void {
		this.mousePosition.x = event.clientX;
		this.mousePosition.y = event.clientY;
		//console.log(this.mousePosition);
	}

	private onClick() {
		const { slotAlpha, slotBeta, slotCharlie, mousePosition, board } = this;

		// If we have a brick set selected and the board has
		// target slots available for the set, that means we
		// can place the bricks on the board and clear the
		// brick set for the selected slot.
		if (this.selectedSlot && this.selectedSlot.brickSet) {
			if (board.targetSlots.length) {
				board.targetSlots.forEach((s, i) => {
					board.slots[s].setBrick(this.selectedSlot!.brickSet!.bricks[i]);
				});
				this.selectedSlot.brickSet = null;
			}

			// Reset the brick set position, and clear the selected slot.
			this.selectedSlot.resetPosition();
			this.selectedSlot = null;
			return;
		}

		// check each slot to see of the mouse is over a brick set
		// if it is, make that slot the selected one
		[slotAlpha, slotBeta, slotCharlie].forEach((s) => {
			if (s.isPointOver(mousePosition)) {
				document.body.style.cursor = "none";
				this.selectedSlot = s;
			}
		});
	}
}
