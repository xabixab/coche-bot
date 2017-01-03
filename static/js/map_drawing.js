var rscale = 200.0; // 1 tile = 20cm // 200mm
var scale = 1;
var tileSize = 40;

function draw(){
	ctx.clearRect(-cx, -cy, cx*2, cy*2);
	scale = scaleSlider.val();
	displayScale = scale * tileSize;
	mmToCanvasCoords = 1 / rscale * displayScale;

	drawGrid(scale);
	drawCar(pos.x, pos.y, pos.rot);
}

function drawGrid(scale){
	ctx.clearRect(0, 0, w, h);
	ctx.beginPath();

	for (var x=origin.x; x<=cx * 4; x=x+displayScale){
		ctx.moveTo(x, -cy * 2);
		ctx.lineTo(x,  cy * 2);
		ctx.moveTo((0 - (x - origin.x)) + origin.x, -cy * 2);
		ctx.lineTo((0 - (x - origin.x)) + origin.x,  cy * 2);
	}

	for (var y=origin.y; y<=cy * 4; y=y+displayScale){
		ctx.moveTo(-cx * 2, y);
		ctx.lineTo( cx * 2, y);
		ctx.moveTo(-cx * 2, (0 - (y - origin.y)) + origin.y);
		ctx.lineTo( cx * 2, (0 - (y - origin.y)) + origin.y);
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

function drawCar(x, y, rot){
	var carDimensions = [350, 300];
	var cnvDim = {
		x: carDimensions[0] * mmToCanvasCoords,
		y: carDimensions[1] * mmToCanvasCoords
	}
	x = origin.x + x * mmToCanvasCoords;
	y = origin.y + y * mmToCanvasCoords;
	canvasCarPos = {
		x: x,
		y: y
	}
	ctx.beginPath();
	ctx.save();
	ctx.translate(x, y);
	ctx.rotate(rot*Math.PI/180);
	ctx.strokeStyle="#FFFFFF";
	ctx.strokeRect(0 - cnvDim.x / 2, 0 - cnvDim.y / 2, cnvDim.x, cnvDim.y);
	ctx.stroke();
	ctx.restore();

	// Draw Car Head
	ctx.beginPath();
	ctx.moveTo(x, y);
	carMouth = {};
	carTail = {};
	carMouth.x = x + displayScale;
	carTail.x = x - displayScale;
	if(rot >= 180){
		carMouth.x = x - displayScale;
		carTail.x = x + displayScale;
	} else {
		carMouth.x = x + displayScale;
		carTail.x = x - displayScale;
	}

	carMouth.y = tan(rot)*(carMouth.x - x) + y;
	carTail.y = tan(rot)*(carTail.x - x) + y;

	ctx.lineTo(carMouth.x, carMouth.y);
	ctx.strokeStyle = "#FFF";
	ctx.stroke();
}
