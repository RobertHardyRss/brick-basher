let canvas = document.querySelector<HTMLCanvasElement>("#main-game")!;
let ctx = canvas.getContext("2d")!;

function initCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	window.addEventListener("resize", onResize);
}

function onResize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	console.log("Resized window", canvas.width, canvas.height);
}

export { canvas, ctx, initCanvas };
