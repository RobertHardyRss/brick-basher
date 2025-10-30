import { BOARD_COLOR } from "../constants";

export class GameBoard {
	color: string = BOARD_COLOR;
	rows: number = 8;
	cols: number = 8;

	constructor(
		private readonly ctx: CanvasRenderingContext2D,
		private readonly x: number,
		private readonly y: number
	) {}

    public draw() : void {
        
    }
}
