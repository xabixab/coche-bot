var rscale = 250.0; // 1 tile = 20cm // 200mm
var scale = 1.5;

$(function(){
	canvas = $("#canvas");
	c = document.getElementById("canvas");
	ctx = c.getContext("2d");
	w = canvas.width();
	h = canvas.height();
	
	socket = io('http://localhost:9000');
	socket.on('connect', function(){
		canvas.mousemove(function(event){
			var mouse = getMousePos(c, event);
			var mouse_pos = fromCanvasToPos(mouse.x, mouse.y);
			$("#info_mouse").html(JSON.stringify([Math.round(mouse_pos[0]), Math.round(mouse_pos[1])]));
		});
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
});

function draw(){
	ctx.clearRect(0, 0, w, h);

	displayScale = scale * 30;
	mmToCanvasTiles = 1 / rscale;
	mmToCanvasCoords = 1 / rscale * displayScale;
	
	drawGrid(0, 0, scale);
	drawCar(pos.x, pos.y, pos.rot);
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

function drawGrid(xoffset, yoffset, scale){

	xoffset = xoffset * mmToCanvasCoords;
	yoffset = yoffset * mmToCanvasCoords;
	lxoffset = (xoffset % displayScale) / 2
	lyoffset = (yoffset % displayScale) / 2
	y0 = (h/2 - (h/2 % displayScale)) + yoffset - lyoffset;
	x0 = (w/2 - (w/2 % displayScale)) + xoffset - lxoffset;

	ctx.clearRect(0, 0, w, h);
	ctx.beginPath();
	
	for (var x=lxoffset; x<=w; x=x+displayScale){
		ctx.moveTo(x,0);
		ctx.lineTo(x,h);
	}

	for (var y=lyoffset; y<=h; y=y+displayScale){
		ctx.moveTo(0,y);
		ctx.lineTo(w,y);
	}
	
	ctx.strokeStyle = "#f00";
	ctx.stroke();
	
	ctx.beginPath();
	ctx.moveTo(0, y0);
	ctx.lineTo(w, y0);
	
	ctx.moveTo(x0, 0);
	ctx.lineTo(x0, h);
	
	ctx.strokeStyle = "#0f0";
	ctx.stroke();
	
	// write labels
	ctx.beginPath();
	ctx.font="15px Arial";
	var lblratio = 2;
	
	for(var y=h / displayScale / 2  % lblratio * displayScale; y<=h; y = y + displayScale * lblratio){
		var lbl = ((y - y0) * (Math.pow(mmToCanvasCoords, -1)) / 1000).toString() + "M";
		ctx.fillText(lbl,x0 + 2, y - 2);
		ctx.fillStyle = "#FF0000";
	}
	
	for(var x=w / displayScale / 2  % lblratio * displayScale; x<=w; x = x + displayScale * lblratio){
		var lbl = ((x - x0) * (Math.pow(mmToCanvasCoords, -1)) / 1000).toString() + "M";
		ctx.fillText(lbl, x + 2, y0 - 2);
		ctx.fillStyle = "#FF0000";
	}
}

function drawCar(x, y, rot){
	var carDimensions = [300, 350];
	cnvDim = {
		x: carDimensions[0] * mmToCanvasCoords,
		y: carDimensions[1] * mmToCanvasCoords
	}
	x = x0 + x * mmToCanvasCoords;
	y = y0 + y * mmToCanvasCoords;
	
	ctx.beginPath();
	ctx.save();
	ctx.translate(x, y);
	ctx.rotate(rot*Math.PI/180);
	ctx.strokeStyle="#FFFFFF";
	ctx.strokeRect(0 - cnvDim.x / 2, 0 - cnvDim.y / 2, cnvDim.x, cnvDim.y); 
	ctx.stroke(); 
	ctx.restore();
}

function fromCanvasToPos(x, y){
	var posx = (x - x0) * (Math.pow(mmToCanvasCoords, -1));
	var posy = (y - y0) * (Math.pow(mmToCanvasCoords, -1));
	return [posx, posy];
}

