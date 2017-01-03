var origin = {x:0.0, y:0.0};
var operations = {}
$(function(){
	canvas = $("#canvas");
	c = document.getElementById("canvas");
	ctx = c.getContext("2d");
	w = canvas.width();
	h = canvas.height();
	cx = w/2;
	cy = h/2;
	ctx.translate(cx, cy);

	scaleSlider = $("#ex1").slider({})
	scaleSlider.on('slide', draw);

	canvas.click(triggerClick);
	$("#control_view").click(centerView);
	$("#tools-operation").hide();
	canvas.mousemove(function(event){
		mouse = getMousePos(c, event);
		mouse.x = 0 - (cx - mouse.x);
		mouse.y = 0 - (cy - mouse.y);
		var mouseInUnits = fromCanvasToUnits(mouse.x, mouse.y);
		$("#info_mouse").html("X:" + round(mouseInUnits.x.toString(),0) + "mm Y:" + round(mouseInUnits.y.toString(),0) + "mm");
	});

});

function triggerClick(){
	if(!(operations.inProgress === true)){
		changeView();
	} else {
		if(operations.rect === true){
			rectClick(mouse);
		}
	}
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	mouse = {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
	return mouse
}

function changeView(){
	origin.x = mouse.x;
	origin.y = mouse.y;
	draw();
}

function centerView(){
	origin.x = 0.0;
	origin.y = 0.0;
	scale = 1;
	draw();
}

function beginOperation(type){
	$("#tools").hide();
	$("#info-"+type).show();
	$("#tools-"+type).show();
	operations[type] = true;
	operations.inProgress = true;
}

function endOperation(type){
	$("#tools-"+type).hide();
	$("#tools").show();
	$("#tools-operation");
	operations[type] = false;
	operations.inProgress = false;
	disableMakeOperation();
}

function makeTrigger(){
	if(operations.rect === true){
		makeRect();
	} else if (operations.arc === true){
		makeArc();
	}
}

function abortTrigger(){
	if(operations.rect === true){
		abortRect();
	} else if(operations.arc === true){
		abortArc();
	}
}

function enableMakeBtn(){
	$("#control-make").removeAttr("disabled");
}

function disableMakeBtn(){
	$("#control-make").attr("disabled", "disabled");
}
