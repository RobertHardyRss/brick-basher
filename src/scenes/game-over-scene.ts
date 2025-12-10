import { BRICK_SIZE } from "../constants";
import { GameResetEvent } from "../game-events";
import { BrickLetterSet } from "../game-objects/brick-letter-set";
import type { PlayerScores } from "../game-objects/score-board";
import {
	letterA,
	letterE,
	letterG,
	letterM,
	letterO,
	letterR,
	letterV,
} from "../letter-pattern-sets";

export class GameOverScene {
	private letterSets: Array<BrickLetterSet> = [];
	private playerScores: PlayerScores | null = null;
	private isGameOver: boolean = false;

	constructor(
		private readonly ctx: CanvasRenderingContext2D,
		private readonly canvas: HTMLCanvasElement
	) {
		this.wireUpEvents();
		this.init();
	}

	private init(): void {
		const { letterSets, canvas, ctx } = this;

		const letterBlockSize = BRICK_SIZE * 5 + BRICK_SIZE;
		const totalWidth = letterBlockSize * 4 - BRICK_SIZE;
		const startX = canvas.width / 2 - totalWidth / 2;
		let x = startX;
		let y = BRICK_SIZE * 3;

		// spell out GAME
		letterSets.push(new BrickLetterSet(ctx, x, y, letterG));
		x += letterBlockSize;

		letterSets.push(new BrickLetterSet(ctx, x, y, letterA));
		x += letterBlockSize;

		letterSets.push(new BrickLetterSet(ctx, x, y, letterM));
		x += letterBlockSize;

		letterSets.push(new BrickLetterSet(ctx, x, y, letterE));
		x += letterBlockSize;

		// go down a block size and spell out OVER
		x = startX;
		y += letterBlockSize;

		letterSets.push(new BrickLetterSet(ctx, x, y, letterO));
		x += letterBlockSize;

		letterSets.push(new BrickLetterSet(ctx, x, y, letterV));
		x += letterBlockSize;

		letterSets.push(new BrickLetterSet(ctx, x, y, letterE));
		x += letterBlockSize;

		letterSets.push(new BrickLetterSet(ctx, x, y, letterR));
		x += letterBlockSize;
	}

	private wireUpEvents(): void {
		this.onGameOver = this.onGameOver.bind(this);
		window.addEventListener("bb-game-over", this.onGameOver);

		this.onEnterPressed = this.onEnterPressed.bind(this);
		window.addEventListener("keypress", this.onEnterPressed);
	}

	private onGameOver(): void {
		this.isGameOver = true;
	}

	private onEnterPressed(e: KeyboardEvent): void {
		if (e.key === "Enter" && this.isGameOver) {
			this.isGameOver = false;
			let resetEvent = new GameResetEvent();
			window.dispatchEvent(resetEvent);
		}
	}

	public draw(): void {
		this.letterSets.forEach((s) => {
			s.draw();
		});

		const letterBlockSize = BRICK_SIZE * 5 + BRICK_SIZE;
		let x = this.canvas.width / 2;
		let y = letterBlockSize * 2 + BRICK_SIZE * 4;

		const { ctx } = this;

		ctx.save();

		ctx.font = "30px Science Gothic";
		ctx.textAlign = "center";
		ctx.fillStyle = "white";

		ctx.fillText(
			`SCORE: ${this.playerScores?.score.toLocaleString() ?? 0}`,
			x,
			y
		);

		ctx.fillStyle = "gold";
		y += 45;
		ctx.fillText(
			`HIGH SCORE: ${this.playerScores?.maxScore.toLocaleString() ?? 0}`,
			x,
			y
		);

		ctx.fillStyle = "silver";
		ctx.font = "20px Science Gothic";
		y += 45;
		ctx.fillText("PRESS ENTER TO PLAY AGAIN!", x, y);

		ctx.restore();
	}

	public updateScores(scores: PlayerScores): void {
		this.playerScores = scores;
	}
}
