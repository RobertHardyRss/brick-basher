export class ScoreBoard {
	private currentScore: number = 123456;
	private maxScore: number = 999999;

	constructor(
		private readonly ctx: CanvasRenderingContext2D,
		private x: number,
		private y: number,
		private w: number,
		private h: number
	) {}

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
}
