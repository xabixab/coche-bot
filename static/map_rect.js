$(function(){
  $("#control_rect").click(initRect);
});

function initRect(){
  operationInProgress = true;
  console.log("Init Rect")
  var slope = round(Math.tan((90 - pos.rot)*Math.PI/180), 8);
  ctx.beginPath();
  var carCanvasPos = fromUnitsToCanvas(pos.x, pos.y);
  console.log(slope);
  ctx.moveTo(carCanvasPos.x, carCanvasPos.y);
  ctx.lineTo(slope*cy - carCanvasPos.x, cy);

  ctx.moveTo(carCanvasPos.x, carCanvasPos.y);
  ctx.lineTo(slope * cy * -1 - carCanvasPos.x, -cy);
  ctx.strokeStyle = "#00F";
  ctx.stroke();

}
