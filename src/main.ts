import { ctx, canvas, initCanvas } from "./canvas-ctx";
import { GameBoard } from "./game-objects/game-board";
import "./style.css";

initCanvas();

let gb = new GameBoard(ctx, canvas.width / 2, 100);
gb.draw();
