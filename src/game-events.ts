declare global {
	interface GlobalEventHandlersEventMap {
		"brick-bash-score": ScoreEvent;
		"brick-bash-game-over": GameOverEvent;
	}
}

export class ScoreEvent extends Event {
	constructor(public readonly score: BrickScore) {
		super("brick-bash-score");
	}
}

export class BrickScore {
	constructor(
		public bricks: number = 0,
		public rows: number = 0,
		public cols: number = 0
	) {}

	public total(): number {
		return this.bricks * 10 * ((this.rows + this.cols) * 10);
	}
}

export class GameOverEvent extends Event {
	constructor() {
		super("brick-bash-game-over");
	}
}
