import "./style.css";
import { ctx, canvas, initCanvas } from "./canvas-ctx";
import { GameManager } from "./game-manager";

initCanvas();

let gm = new GameManager(ctx, canvas);
let lastTimestamp = 0;

function gameLoop(timestamp: number) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	let elapsedTime = timestamp - lastTimestamp;
	lastTimestamp = timestamp;

	gm.update(elapsedTime);
	gm.draw();

	// make sure this stays as the last thing
	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
