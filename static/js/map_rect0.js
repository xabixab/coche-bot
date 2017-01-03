$(function(){
  $("#control-rect").click(initRect);
  $("#tools-rect").hide();
  $("#rect-abort").click(rectAbort);
  $("#rect-make").click(rectMake);
  $("#info-rect").hide();
  $("#rect-vel").change(rectUpdateVel);
});

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
