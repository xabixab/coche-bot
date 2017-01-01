$(function(){
  $("#control-rect").click(initRect);
  $("#tools-rect").hide();
  $("#rect-abort").click(rectAbort);
  $("#rect-make").click(rectMake);
  $("#info-rect").hide();
  $("#rect-vel").change(rectUpdateVel);
});

function initRect(){
  if(operations.inProgress === true){
    console.log("Anohter operation in progress.")
    return false;
  }
  beginOperation("rect");

  rectOperation = {data:{points:[]}, status:0}
  console.log("Init Rect")
  var slope = getSlope(pos.rot);
  ctx.beginPath();
  var carCanvasPos = fromUnitsToCanvas(pos.x, pos.y);
  for(i = -cx; i <= cx; i++){
    var py = slope * (i - carCanvasPos.x) + carCanvasPos.y;
    var point = {
      x:i,
      y:py
    }
    rectOperation.data.points.push(point);
  }
  y1 = slope * (-cx - carCanvasPos.x) + carCanvasPos.y
  y2 = slope * (cx - carCanvasPos.x) + carCanvasPos.y
  ctx.moveTo(-cx, y1);
  ctx.lineTo( cx, y2);

  ctx.strokeStyle = "#00F";
  ctx.stroke();

  $("#info-rect").html("Ezarri ezazu helmuga puntua.");
  $("#rect-make").attr("disabled", "");
  rectOperation.status = 1;
}

function rectClick(mouse_pos){
  if(rectOperation.status == 1){
    var distances = [];
    var carCanvasPos = fromUnitsToCanvas(pos.x, pos.y);
    rectOperation.data.points.forEach(function(val, i){
      var pdist = getDistanceBetweenPoints(mouse_pos, val);
      distances.push([pdist, val]);
    });
    rectOperation.data.pointsNearest = distances;
    var lowest;
    rectOperation.data.pointsNearest.forEach(function(val, i){
      if (typeof(lowest) == "undefined"){
        lowest = val;
      } else if(lowest[0] > val[0]){
        lowest = val;
      }
    });
    rectOperation.data.pointNearest = lowest[1];
    draw();
    ctx.beginPath();
    ctx.moveTo(carCanvasPos.x, carCanvasPos.y);
    ctx.lineTo(rectOperation.data.pointNearest.x, rectOperation.data.pointNearest.y);
    ctx.strokeStyle = "#00F";
    ctx.stroke();

    var distanceToMouth = getDistanceBetweenPoints(carMouth, rectOperation.data.pointNearest);
    var distanceToTail = getDistanceBetweenPoints(carTail, rectOperation.data.pointNearest);

    var canvasDistance = getDistanceBetweenPoints(canvasCarPos, rectOperation.data.pointNearest);

    if(distanceToMouth > distanceToTail){
      canvasDistance = canvasDistance * - 1;
    }

    rectOperation.data.realEndpoint = fromCanvasToUnits(rectOperation.data.pointNearest.x, rectOperation.data.pointNearest.y);
    rectOperation.data.realDistance = canvasDistance * Math.pow(mmToCanvasCoords, -1);
    rectOperation.status = 2;
    rectUpdateVel();
    $("#rect-make").removeAttr("disabled");
  } else {
    return false;
  }
}

function rectUpdateVel(){
  if(rectOperation.status != 2){
    return false;
  }

  rectOperation.data.realVel = $("#rect-vel").val();
  rectOperation.data.realTime = Math.abs(rectOperation.data.realDistance / rectOperation.data.realVel);
  var lbl1 = "Ezarritako helmuga: x:" + round(rectOperation.data.realEndpoint.y,0).toString() + "mm y:" + round(rectOperation.data.realEndpoint.y,0).toString() + "mm";
  var lbl2 = "Ibilitako distantzia: " + round(rectOperation.data.realDistance,0).toString() + "mm @ " + rectOperation.data.realVel.toString() + "mm/s = " + round(rectOperation.data.realTime,2).toString() + "s"
  $("#info-rect").html(lbl1 + "<br/>" + lbl2);
}


function drawLine(point, alfa, modulo, color = "#F00"){
  ctx.beginPath();
  var slope = getSlope(alfa);
  var dest = {
    x: 0,
    y: 0
  }
  ctx.moveTo(point.x, point.y);
  ctx.lineTo(dest.x, dest.y);
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
