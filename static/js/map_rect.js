$(function(){
  $("#control-rect").click(initRect);
  $("#tools-rect").hide();
  $("#rect-abort").click(rectAbort);
  $("#rect-make").click(rectMake);
  $("#info-rect").hide();
});

function initRect(){
  if(operations.inProgress === true){
    console.log("Anohter operation in progress.");
    return false;
  }
  beginOperation("rect");
  rectOperation = {data:{}, status:0, params: {}};
}

function rectUpdate(){
  draw();
  rectOperation.params.distance = $("#rect-distance").val();
  rectOperation.params.canvasDistance = rectOperation.params.distance * mmToCanvasCoords;
  ctx.beginPath();
  ctx.moveTo(canvasCarPos.x, canvasCarPos.y);
  var finalPoint = {x:0.0, y:0.0}
  finalPoint.x = rectOperation.params.canvasDistance * Math.sin((90 -  pos.rot) * toRadians) / Math.sin((90) * toRadians);
  finalPoint.y = Math.sqrt(Math.pow(rectOperation.params.canvasDistance, 2) - Math.pow(finalPoint.x, 2));
  // add vectors.
  finalPoint.x = finalPoint.x + canvasCarPos.x;
  finalPoint.y = finalPoint.y + canvasCarPos.y;
  console.log(finalPoint);
  ctx.lineTo(finalPoint.x, finalPoint.y);
  ctx.strokeStyle = "#FF0";
  ctx.stroke();
}

function rectAbort(){
  rectOperation = null;
  endOperation("rect");
  draw();
}

function rectMake(){
  var finalParams = {
    distance: rectOperation.data.realDistance,
    velocity: rectOperation.data.realVel
  }
  socket.emit("mvrect", finalParams);
  console.log("mvrect sended with params:"+JSON.stringify(finalParams));
  rectOperation = null;
  endOperation("rect");
  draw();
}
