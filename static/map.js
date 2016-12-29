var rscale = 200.0; // 1 tile = 20cm // 200mm
var scale = 1;
var offset = {x:0.0, y:0.0};
var origin = {x:0.0, y:10.0};
var tileSize = 40;
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
	
	socket = io('http://localhost:9000');
	socket.on('connect', function(){
		console.log("Connected!");
	});

	socket.on('position', function (data) {
		pos = data;
		$("#info_pos").html(JSON.stringify([pos.x, pos.y]));
		$("#info_rot").html(JSON.stringify([pos.rot]));
		console.log(data);
		draw();
	});

	socket.on('disconnect', function(){
		console.log("disconnected! :(");
	});
	canvas.click(changeView);
	$("#control_view").click(function(){
		origin.x = 0.0;
		origin.y = 0.0;
		scale = 1;
		draw();
	});
	canvas.mousemove(function(event){
		mouse = getMousePos(c, event);
		mouse.x = 0 - (cx - mouse.x);
		mouse.y = 0 - (cy - mouse.y);
		var mouseInUnits = fromCanvasToUnits(mouse.x, mouse.y);
		$("#info_pos").html("X:" + round(mouseInUnits.x.toString(),0) + "mm Y:" + round(mouseInUnits.y.toString(),0) + "mm");
	});
	
});

function draw(){
	ctx.clearRect(-cx, -cy, cx*2, cy*2);

	scale = scaleSlider.val();
	displayScale = scale * tileSize;
	// mmToCanvasTiles = 1 / rscale; // OBSOLETE?
	mmToCanvasCoords = 1 / rscale * displayScale;
	
	drawGrid(scale);
	drawCar(pos.x, pos.y, pos.rot);
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	mouse = {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
	return mouse
}

function drawGrid(scale){
	ctx.clearRect(0, 0, w, h);
	ctx.beginPath();
	
	for (var x=origin.x; x<=cx * 4; x=x+displayScale){
		ctx.moveTo(x, -cy);
		ctx.lineTo(x,  cy);
		ctx.moveTo((0 - (x - origin.x)) + origin.x, -cy);
		ctx.lineTo((0 - (x - origin.x)) + origin.x,  cy);
	}
	
	for (var y=origin.y; y<=cy * 4; y=y+displayScale){
		ctx.moveTo(-cx, y);
		ctx.lineTo( cx, y);
		ctx.moveTo(-cx, (0 - (y - origin.y)) + origin.y);
		ctx.lineTo( cx, (0 - (y - origin.y)) + origin.y);
	}

	ctx.strokeStyle = "#f00";
	ctx.stroke();
	
	ctx.beginPath();
	ctx.moveTo(-cx, origin.y);
	ctx.lineTo(cx, origin.y);
	
	ctx.moveTo(origin.x, -cy);
	ctx.lineTo(origin.x, cy);
	
	ctx.strokeStyle = "#0f0";
	ctx.stroke();

	// write labels
	ctx.beginPath();
	ctx.font="12px Arial";
	var lblratio = 2;
	
	for(var y=origin.y; y<=cy*4; y = y + displayScale * lblratio){
		var xu = fromCanvasToUnits(0,y).y;
		var lbl = round(xu/1000,5).toString() + "M";
		ctx.fillText(lbl,origin.x + 2, y - 2);
		if(y!=origin.y){
			ctx.fillText("-" + lbl, origin.x + 2, (0 - (y - origin.y)) + origin.y - 2);
		}
		ctx.fillStyle = "#FF0000";
	}
	
	for(var x=origin.x; x<=cy*4; x = x + displayScale * lblratio){
		var yu = fromCanvasToUnits(x, 0).x;
		var lbl = round(yu/1000,5).toString() + "M";
		ctx.fillText(lbl, x + 2, origin.y - 4);
		if(x!=origin.x){
			ctx.fillText("-" + lbl, (0 - (x - origin.x)) + origin.x + 2, origin.y - 2);
		}
		ctx.fillStyle = "#FF0000";
	}
}

function fromCanvasToUnits(x, y){
	var px = (x - origin.x) * (Math.pow(mmToCanvasCoords, -1));
	var py = (y - origin.y) * (Math.pow(mmToCanvasCoords, -1));
	return {x: px, y: py}
}

function drawCar(x, y, rot){
	var carDimensions = [300, 350];
	var cnvDim = {
		x: carDimensions[0] * mmToCanvasCoords,
		y: carDimensions[1] * mmToCanvasCoords
	}
	x = origin.x + x * mmToCanvasCoords;
	y = origin.y + y * mmToCanvasCoords;
	
	ctx.beginPath();
	ctx.save();
	ctx.translate(x, y);
	ctx.rotate(rot*Math.PI/180);
	ctx.strokeStyle="#FFFFFF";
	ctx.strokeRect(0 - cnvDim.x / 2, 0 - cnvDim.y / 2, cnvDim.x, cnvDim.y); 
	ctx.stroke(); 
	ctx.restore();
}
/*
function fromCanvasToPos(x, y){
	var posx = (x - x0) * (Math.pow(mmToCanvasCoords, -1));
	var posy = (y - y0) * (Math.pow(mmToCanvasCoords, -1));
	return [posx, posy];
}

function changeView(){
	var mouseRealPos = fromCanvasToPos(mouse.x, mouse.y);
	offset.x = mouseRealPos[0];
	offset.y = mouseRealPos[1];
	draw();
}
*/

function changeView(){
	origin.x = mouse.x;
	origin.y = mouse.y;
	draw();
}
function round(a, zeros){
	return Math.round(a * Math.pow(10, zeros)) / Math.pow(10, zeros);
}
