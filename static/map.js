var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var spc = 25;
$(function(){
	createGrid();
});

function createGrid(){
	var canvas = $("#canvas");
	var w = canvas.width();
	var h = canvas.height();
	
	ctx.beginPath();
	
	for (var x=0; x<=w; x=x+spc){
		ctx.moveTo(x,0);
		ctx.lineTo(x,h);
	}

	for (var y=0; y<=h; y=y+spc){
		ctx.moveTo(0,y);
		ctx.lineTo(w,y);
	}
	
	ctx.strokeStyle = "#f00";
	ctx.stroke();
	
	ctx.beginPath();
	ctx.moveTo(0, h/2);
	ctx.lineTo(w, h/2);
	
	ctx.moveTo(w/2, 0);
	ctx.lineTo(w/2, h);
	
	ctx.strokeStyle = "#0f0";
	ctx.stroke();
}

var socket = io('http://localhost:9000');

socket.on('connect', function(){
	console.log("connected!");
});

socket.on('position', function (data) {
	$("#info_pos").html(JSON.stringify([data[0], data[1]]));
	$("#info_rot").html(JSON.stringify([data[2]]));
    console.log(data);
});

socket.on('disconnect', function(){
	console.log("disconnected! :(");
});
