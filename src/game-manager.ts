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

	private initSlots() {
		let pointBeta = new Point(
			this.canvas.width / 1.8 - BRICK_SIZE * 2,
			this.boardPadding.top + BRICK_SIZE * 8 + this.boardPadding.bottom
		);
		this.slotBeta = new PatternSlot(this.ctx, pointBeta);

		pointBeta.x -= BRICK_SIZE * 5;
		this.slotAlpha = new PatternSlot(this.ctx, pointBeta);

		pointBeta.x += BRICK_SIZE * 10;
		this.slotCharlie = new PatternSlot(this.ctx, pointBeta);
	}

	public update(elapsedTime: number): void {
		document.body.style.cursor = "default";

		if (this.slotBeta.brickSet?.isPointOver(this.mousePosition)) {
			console.log("mouse over slot beta", elapsedTime);
			document.body.style.cursor = "grab";
		}

		if (this.selectedSlot && this.selectedSlot.brickSet) {
			this.selectedSlot.brickSet!.move(this.mousePosition);
			document.body.style.cursor = "none";
			this.board.highlightBrickSet(this.selectedSlot.brickSet!);
		}
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
		const { slotBeta, mousePosition, board } = this;

		console.log("click", this);

		if (this.selectedSlot && this.selectedSlot.brickSet) {
			if (board.targetSlots.length) {
				board.targetSlots.forEach((s, i) => {
					board.slots[s].setBrick(this.selectedSlot!.brickSet!.bricks[i]);
				});
				this.selectedSlot.brickSet = null;

				// temp
				this.selectedSlot.generateSet();
			}
			this.selectedSlot.resetPosition();
			this.selectedSlot = null;
			return;
		}

		if (slotBeta.brickSet?.isPointOver(mousePosition)) {
			document.body.style.cursor = "none";
			this.selectedSlot = this.slotBeta;
		}
	}
}
