import { Brick } from "./brick";

export abstract class BrickSetBase {
	public bricks: Array<Brick> = [];
	public color: string = "red";

	constructor(
		protected readonly ctx: CanvasRenderingContext2D,
		public x: number,
		public y: number
	) {}

	public draw(): void {
		this.bricks.forEach((b) => b.draw());
	}

	protected setColor(): void {
		const colors: Array<string> = ["red", "orange", "green", "blue", "purple"];

		let rand = Math.floor(Math.random() * colors.length);

		this.color = colors[rand];
	}
}
