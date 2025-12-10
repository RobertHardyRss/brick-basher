import { ScoreEvent } from "../game-events";
import { getCookie, setCookie } from "typescript-cookie";

const MAX_SCORE_COOKIE: string = "max-score";

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
		this.maxScore = Math.floor(
			(getCookie(MAX_SCORE_COOKIE) as number | undefined) ?? 0
		);
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

		this.onGameOver = this.onGameOver.bind(this);
		window.addEventListener("bb-game-over", this.onGameOver);
	}

	private onScore(e: ScoreEvent) {
		this.currentScore += e.score.total();
	}

	private onGameOver(): void {
		if (this.currentScore > this.maxScore) {
			setCookie(MAX_SCORE_COOKIE, this.currentScore);
		}
	}

	public getPlayerScores(): PlayerScores {
		return new PlayerScores(this.currentScore, this.maxScore);
	}
}

export class PlayerScores {
	constructor(
		public readonly score: number,
		public readonly maxScore: number
	) {}
}
