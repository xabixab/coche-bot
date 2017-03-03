class MoveTo {
  constructor(params){
    var that = this;
    enableMakeBtn();
    beginOperation("moveto");
    that.update();
  }

  update(){
    var that = this;
    console.log("update MoveTo");
    that.endpos = {
      x: parseInt($("#moveto-xpos").val()),
      y: parseInt($("#moveto-ypos").val())
    };

    that.rotvel = parseInt($("#moveto-rotvel").val());
    that.rectvel = parseInt($("#moveto-rectvel").val());

    var rotateDistance = 0;
    var rotateTime = rotateDistance / that.rotvel;
    var rectDistance = getDistanceBetweenPoints(carMouth, that.endPos);
    var rectTime = rectDistance / that.rectvel;

    that.time = rectTime + rotateTime;
    $("#moveto-time").val(that.time);

  }
  make(){
    endOperation("moveto");
    operations.moveto = false;
    draw();
  }

  abort(){
    console.log("abort moveto");
    operations.moveto = false;
    endOperation("moveto");
    draw();
  }
}

$(function(){
  $("#tools-moveto").hide();
  $("#control-moveto").click(function(){
    if(operations.inProgress === true){
      console.log("Another operation in progress.");
      return false;
    }
    operations.moveto = new MoveTo({});

  });

  $("#control-make").click(function(){
    if (typeof(operations.moveto) != "undefined" && operations.moveto !== false){
      operations.rotate.make();
    }
  });
  $("#control-abort").click(function(){
    if (typeof(operations.moveto) != "undefined" && operations.moveto !== false){
      operations.rotate.abort();
    }
  });
  $("#moveto-xpos,#moveto-ypos,#moveto-rectvel,#moveto-rotvel,#moveto-time").change(function () {
    if (typeof(operations.rotate) != "undefined" && operations.rotate !== false){
      operations.rotate.update();
    }
  });
});
