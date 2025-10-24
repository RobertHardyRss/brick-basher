import "./style.css";

let canvas = document.querySelector<HTMLCanvasElement>("#main-game")!;
let ctx = canvas.getContext("2d")!;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "purple";
ctx.fillRect(0, 0, canvas.width, canvas.height);

function onResize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	console.log("Resized window", canvas.width, canvas.height);
}

window.addEventListener("resize", onResize);
