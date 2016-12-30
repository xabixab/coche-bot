$(function(){

	socket = io('http://localhost:9000');
	socket.on('connect', function(){
		console.log("Connected!");
	});

	socket.on('position', function (data) {
		pos = data;
		$("#info_pos").html(JSON.stringify([pos.x, pos.y]));
		$("#info_rot").html(JSON.stringify([pos.rot]));
		console.log(data);
		operationInProgress = false;
		draw();
	});

	socket.on('disconnect', function(){
		console.log("disconnected! :(");
	});

});
