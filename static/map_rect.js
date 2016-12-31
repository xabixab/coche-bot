$(function(){
  $("#control_rect").click(initRect);
});

function initRect(){
  operationInProgress = true;
  console.log("Init Rect")
  var slope = round(Math.tan((pos.rot)*Math.PI/180), 8);
  ctx.beginPath();
  var carCanvasPos = fromUnitsToCanvas(pos.x, pos.y);
  console.log(slope);
  y1 = slope * (-cx - carCanvasPos.x) + carCanvasPos.y
  y2 = slope * (cx - carCanvasPos.x) + carCanvasPos.y
  ctx.moveTo(-cx, y1);
  ctx.lineTo( cx, y2);

  ctx.strokeStyle = "#00F";
  ctx.stroke();
}

function getDistanceBetweenPoints(p1, p2){
  var xd = p2.x - p1.x;
  var yd = p2.y - p1.y;
  return Math.abs(Math.sqrt(Math.pow(xd, 2) + Math.pow(yd, 2)));
}

function drawLine(){
}
