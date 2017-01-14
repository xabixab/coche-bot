$(function(){
  $("#control-rect").click(initRect);
  $("#tools-rect").hide();
  $("#control-abort").click(rectAbort);
  $("#control-make").click(rectMake);
  $("#info-rect").hide();
  $("#rect-distance").change(rectUpdate);
});

function initRect(){
  if(operations.inProgress === true){
    console.log("Anohter operation in progress.");
    return false;
  }
  beginOperation("rect");
  rectOperation = {data:{}, status:0, params: {}};
  rectUpdate();
  enableMakeBtn();
}

function rectUpdate(){
  draw();
  rectOperation.params.distance = parseInt($("#rect-distance").val());
  rectOperation.params.velocity = parseInt($("#rect-vel").val());
  rectOperation.params.time = rectOperation.params.distance / rectOperation.params.velocity;
  rectOperation.params.canvasDistance = rectOperation.params.distance * mmToCanvasCoords;
  ctx.beginPath();
  ctx.moveTo(canvasCarPos.x, canvasCarPos.y);
  var finalPoint = {x:0.0, y:0.0}

  finalPoint.x = rectOperation.params.canvasDistance * Math.sin((90 - pos.rot) * toRadians);
  finalPoint.y = rectOperation.params.canvasDistance * Math.cos((90 - pos.rot) * toRadians)
  // finalPoint.y = Math.sqrt(Math.pow(rectOperation.params.canvasDistance, 2) - Math.pow(finalPoint.x, 2) * );
  // add vectors.


  finalPoint.x = finalPoint.x + canvasCarPos.x;
  finalPoint.y = finalPoint.y + canvasCarPos.y;

  var realFinalPoint = fromCanvasToUnits(finalPoint.x, finalPoint.y);
  $("#rect-finalx").val(round(finalPoint.x * (Math.pow(mmToCanvasCoords, -1)), 0) + "mm");
  $("#rect-finaly").val(round(finalPoint.y * (Math.pow(mmToCanvasCoords, -1)), 0) + "mm");


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
    distance: rectOperation.params.distance,
    velocity: rectOperation.params.velocity
  }
  socket.emit("mvrect", finalParams);
  console.log("mvrect sended with params:"+JSON.stringify(finalParams));
  rectOperation = null;
  endOperation("rect");
  draw();
}
