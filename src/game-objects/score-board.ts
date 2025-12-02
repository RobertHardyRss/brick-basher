export class ScoreBoard {
	private currentScore: number = 123456;

	constructor(
		private readonly ctx: CanvasRenderingContext2D,
		private x: number,
		private y: number,
		private w: number,
		private h: number
	) {}

	public draw(): void {
		const { ctx, x, y, w, h, currentScore } = this;

		// save the current state of our ctx
		ctx.save();

		let currentScoreX = x + w / 2;
		let currentScoreY = y + h / 2;

		ctx.font = "20px fantasy";
		ctx.textAlign = "center";
		ctx.fillStyle = "white";

		ctx.fillText(currentScore.toString(), currentScoreX, currentScoreY);

		ctx.restore();
	}
}
