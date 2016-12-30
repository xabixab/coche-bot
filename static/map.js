var origin = {x:0.0, y:0.0};
var operationInProgress = false;
$(function(){
	canvas = $("#canvas");
	c = document.getElementById("canvas");
	ctx = c.getContext("2d");
	w = canvas.width();
	h = canvas.height();
	cx = w/2;
	cy = h/2;
	ctx.translate(cx, cy);

	scaleSlider = $("#ex1").slider({})
	scaleSlider.on('slide', draw);

	canvas.click(changeView);
	$("#control_view").click(centerView);
	canvas.mousemove(function(event){
		mouse = getMousePos(c, event);
		mouse.x = 0 - (cx - mouse.x);
		mouse.y = 0 - (cy - mouse.y);
		var mouseInUnits = fromCanvasToUnits(mouse.x, mouse.y);
		$("#info_mouse").html("X:" + round(mouseInUnits.x.toString(),0) + "mm Y:" + round(mouseInUnits.y.toString(),0) + "mm");
	});

});

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	mouse = {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
	return mouse
}

function fromCanvasToUnits(x, y){
	var px = (x - origin.x) * (Math.pow(mmToCanvasCoords, -1));
	var py = (y - origin.y) * (Math.pow(mmToCanvasCoords, -1));
	return {x: px, y: py}
}

function fromUnitsToCanvas(x, y){
	var px = mmToCanvasCoords * x + origin.x;
	var py = mmToCanvasCoords * y + origin.y;
	return {x: px, y:py}
}

function changeView(){
	origin.x = mouse.x;
	origin.y = mouse.y;
	draw();
}

function tan(n){
	return Math.tan(n * Math.PI/180);
}

function centerView(){
	origin.x = 0.0;
	origin.y = 0.0;
	scale = 1;
	draw();
}
function round(a, zeros){
	return Math.round(a * Math.pow(10, zeros)) / Math.pow(10, zeros);
}
