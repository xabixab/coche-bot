var operationInProgress;
var pos;
class CarSocket {
	constructor(params){
		self = this;
		self.socket = io(params.host);
		self.socket.on('connect', function(){
			console.log("Connected!");
		});

		self.socket.on('position', function (data) {
			pos = data;
			$("#info_pos").html(JSON.stringify([pos.x, pos.y]));
			$("#info_rot").html(JSON.stringify([pos.rot]));
			console.log(data);
			operationInProgress = false;
			draw();
		});

		self.socket.on('disconnect', function(){
			console.log("disconnected! :(");
		});
	}

	send(evt, value){
		self = this;
		self.socket.emit(evt, value);
		return true;
	}
}
