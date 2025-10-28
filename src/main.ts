import { ctx, canvas, initCanvas } from "./canvas-ctx";
import { Brick } from "./game-objects/brick";
import "./style.css";

initCanvas();

// ctx.fillStyle = "purple";
// ctx.fillRect(0, 0, canvas.width, canvas.height);

let brick = new Brick(ctx, canvas.width / 2, canvas.height / 2);
brick.draw();
