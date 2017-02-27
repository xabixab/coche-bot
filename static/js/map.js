var origin = {x:0.0, y:0.0};
var operations = {};
var rangers = {};
var config;

$(function(){
	$("body").hide();
	$.get("/getConfig", function(data){
		config = data;
		$("body").show();
		for (var key in config.rangers) {
			rangers[key] = new Ranger(config.rangers[key]);
		}
		init();
	})
});

var cSocekt;
function init(){
	$("#tools-operation").hide();
	canvas = $("#canvas");
	c = document.getElementById("canvas");
	ctx = c.getContext("2d");
	w = canvas.width();
	h = canvas.height();
	cx = w/2;
	cy = h/2;
	ctx.translate(cx, cy);

	cSocket = new CarSocket({
		host: "http://127.0.0.1:9000"
	});

	$("#control-abort").click(abortTrigger);
	$("#control-make").click(makeTrigger);

	scaleSlider = $("#ex1").slider({})
	scaleSlider.on('slide', draw);
	draw();

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
}

function triggerClick(){
	if(operations.inProgress === true){
		if(operations.rect === true){
			rectUpdate();
		}
	}
	if(!(operations.viewfixed === true)){
		changeView();
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

function changeViewToCar(){
	//origin.x = cn
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
	$("#tools-operation").show();
}

function endOperation(type){
	$("#tools-"+type).hide();
	$("#tools").show();
	$("#tools-operation").hide();
	operations[type] = false;
	operations.inProgress = false;
	disableMakeBtn();
	$("#tools-operation").hide();
}

function makeTrigger(){
	if(operations.rect === true){
		rectMake();
	} else if (operations.arc === true){
		makeArc();
	} else if (typeof(operations.rect) == "object"){

	}
}

function abortTrigger(){
	if(operations.rect === true){
		rectAbort();
	} else if(operations.arc === true){
		abortArc();
	}
	$("#tools-operation").hide();
}

function enableMakeBtn(){
	$("#control-make").removeAttr("disabled");
}

function disableMakeBtn(){
	$("#control-make").attr("disabled", "disabled");
}
