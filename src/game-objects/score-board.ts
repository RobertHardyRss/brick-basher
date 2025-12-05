import type { ScoreEvent } from "../game-events";

export class ScoreBoard {
	private currentScore: number = 0;
	private maxScore: number = 0;

	constructor(
		private readonly ctx: CanvasRenderingContext2D,
		private x: number,
		private y: number,
		private w: number,
		private h: number
	) {
		this.wireUpEvents();
	}

	public draw(): void {
		const { ctx, x, y, w, h, currentScore, maxScore } = this;

		// save the current state of our ctx
		ctx.save();

		let currentScoreX = x + w / 2;
		let currentScoreY = y + h / 2 + 15;

		ctx.font = "30px Science Gothic";
		ctx.textAlign = "center";
		ctx.fillStyle = "white";

		ctx.fillText(currentScore.toLocaleString(), currentScoreX, currentScoreY);

		ctx.font = "20px Science Gothic";
		ctx.textAlign = "left";
		ctx.fillStyle = "gold";

		ctx.fillText(maxScore.toLocaleString(), x + 20, y + 25);

		ctx.restore();
	}

	private wireUpEvents(): void {
		this.onScore = this.onScore.bind(this);
		window.addEventListener("bb-score", this.onScore);
	}

	private onScore(e: ScoreEvent) {
		console.log("Score board listener", e.score);
		this.currentScore += e.score.total();
	}
}
