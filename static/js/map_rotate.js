class Rotate {
  constructor(params){
    var that = this;
    enableMakeBtn();
    beginOperation("rotate");
    that.update();
  }

  update(){
    console.log("update");

    var inpAngle = parseInt($("#rotate-angle").val()) % 360;
    $("#rotate-angle").val(inpAngle);

    var vel = Math.abs($("#rotate-vel").val());
    $("#rotate-vel").val(vel);

    var time = Math.abs(inpAngle / parseInt($("#rotate-vel").val())* 1000);;
    $("#rotate-time").val(Math.round(time));

    var frot = Math.abs(inpAngle + pos.rot);
    $("#rotate-frotation").val(frot);

    var angle = inpAngle + pos.rot;
    draw();

    var radius = config.car_weights.wseparation * mmToCanvasCoords/2;
    var sa1 = (90 + pos.rot) * Math.PI/180;
    var ea1 = (90 + angle) * Math.PI/180;
    var sa2 = sa1 + 180 * Math.PI/180;
    var ea2 = ea1 + 180 * Math.PI/180;

    ctx.beginPath();
    ctx.strokeStyle = "#FFF";
    ctx.moveTo(carMouth.x, carMouth.y);
    ctx.arc(carMouth.x, carMouth.y, radius, sa1, sa1);
    ctx.moveTo(carMouth.x, carMouth.y);
    ctx.arc(carMouth.x, carMouth.y, radius, sa2, sa2);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "#0F0";
    ctx.moveTo(carMouth.x, carMouth.y);
    ctx.arc(carMouth.x, carMouth.y, radius, ea1, ea1);
    ctx.moveTo(carMouth.x, carMouth.y);
    ctx.arc(carMouth.x, carMouth.y, radius, ea2, ea2);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "#FF0";
    ctx.arc(carMouth.x, carMouth.y, radius, sa1, ea1);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(carMouth.x, carMouth.y, radius, sa2, ea2);
    ctx.stroke();

  }

  make(){
    console.log("make");
    var params = {
      "angle": pos.rot + parseInt($("#rotate-angle").val()) % 360,
      "velocity": parseInt($("#rotate-vel").val())
    }
    cSocket.send("rotate", params);
    endOperation("rotate");
    operations.rotate = false;
    draw();
  }

  abort(){
    console.log("abort");
    operations.rotate = false;
    endOperation("rotate");
    draw();
  }
}


console.log("rotate loaded");
$(function(){
  $("#tools-rotate").hide();
  $("#control-rotate").click(function(){
    if(operations.inProgress === true){
      console.log("Anohter operation in progress.");
      return false;
    }
    operations.rotate = new Rotate({});
  });

  $("#control-make").click(function(){
    if (typeof(operations.rotate) != "undefined" && operations.rotate !== false){
      operations.rotate.make();
    }
  });

  $("#control-abort").click(function(){
    if (typeof(operations.rotate) != "undefined" && operations.rotate !== false){
      operations.rotate.abort();
    }
  });

  $("#rotate-angle").change(function () {
    if (typeof(operations.rotate) != "undefined" && operations.rotate !== false){
      operations.rotate.update();
    }
  });

  $("#rotate-vel").change(function () {
    if (typeof(operations.rotate) != "undefined" && operations.rotate !== false){
      operations.rotate.update();
    }
  });

  $("#rotate-frotation").change(function () {
    if (typeof(operations.rotate) != "undefined" && operations.rotate !== false){
      operations.rotate.update();
    }
  });
});
