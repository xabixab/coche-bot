var toRadians = Math.PI / 180;
var toAngles = Math.pow(Math.PI / 180, -1);

function round(a, zeros){
	return Math.round(a * Math.pow(10, zeros)) / Math.pow(10, zeros);
}

function tan(n){
	return Math.tan(n * Math.PI/180);
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

function getSlope(alfa){
  var alfaInRadians = (alfa) * Math.PI / 180;
  var slope = round(Math.tan(alfaInRadians),8);
  return slope;
}

function getDistanceBetweenPoints(p1, p2){
  /*
      Gets the distance of 2 points using pitagoras.
  */
  var xd = p2.x - p1.x;
  var yd = p2.y - p1.y;
  var distance = Math.sqrt(Math.pow(xd, 2) + Math.pow(yd, 2));
	return distance;
}
