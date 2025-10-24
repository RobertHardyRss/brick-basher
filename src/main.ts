import { ctx, canvas, initCanvas } from "./canvas-ctx";
import "./style.css";

initCanvas();

ctx.fillStyle = "purple";
ctx.fillRect(0, 0, canvas.width, canvas.height);
