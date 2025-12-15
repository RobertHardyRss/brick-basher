import "./style.css";
import { ctx, canvas, initCanvas } from "./canvas-ctx";
import { GameManager } from "./game-manager";

initCanvas();

let gm = new GameManager(ctx, canvas);

function gameLoop() {
	gm.update();
	gm.draw();

	// make sure this stays as the last thing
	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
