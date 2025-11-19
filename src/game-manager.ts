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
		const { board, slotAlpha, slotBeta, slotCharlie, ctx, canvas } = this;

		// clear the canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		board.draw();
		slotAlpha.brickSet.draw();
		slotBeta.brickSet.draw();
		slotCharlie.brickSet.draw();

		this.selectedSlot?.brickSet.draw();
	}

	public update(timestamp: number): void {
		const slots = [this.slotAlpha, this.slotBeta, this.slotCharlie];

		// set mouse cursor to default
		document.body.style.cursor = "default";

		if (this.selectedSlot) {
			document.body.style.cursor = "none";
			this.selectedSlot.move(this.mousePosition);
		}

		if (
			!this.selectedSlot &&
			slots.some((s) => s.isPointOver(this.mousePosition))
		) {
			document.body.style.cursor = "grab";
		}
	}

	private initSlots() {
		const y = this.boardPadding.top + BRICK_SIZE * 8 + this.boardPadding.bottom;

		let pointBeta = new Point(this.canvas.width / 1.8 - BRICK_SIZE * 2, y);
		let pointAlpha = new Point(pointBeta.x - BRICK_SIZE * 5, y);
		let pointCharlie = new Point(pointBeta.x + BRICK_SIZE * 5, y);

		this.slotBeta = new PatternSlot(this.ctx, pointBeta);
		this.slotAlpha = new PatternSlot(this.ctx, pointAlpha);
		this.slotCharlie = new PatternSlot(this.ctx, pointCharlie);
	}

	private wireUpEvents() {
		this.onMouseMove = this.onMouseMove.bind(this);
		document.addEventListener("mousemove", this.onMouseMove);

		this.onClick = this.onClick.bind(this);
		document.addEventListener("click", this.onClick);
	}

	private onMouseMove(event: MouseEvent) {
		this.mousePosition.x = event.clientX;
		this.mousePosition.y = event.clientY;
		//console.log("Mouse position", this.mousePosition);
	}

	private onClick() {
		console.log("Mouse Clicked!");

		// we need to track the selected slot
		// we need pick up brick set if we don't have one

		// we need to drop a brickset if click on an empty space
		if (this.selectedSlot) {
			this.selectedSlot.resetPosition();
			this.selectedSlot = null;
		}

		const slots = [this.slotAlpha, this.slotBeta, this.slotCharlie];

		slots.forEach((s) => {
			if (s.isPointOver(this.mousePosition)) {
				this.selectedSlot = s;
			}
		});
	}
}
