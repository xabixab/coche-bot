var operationInProgress;
var pos;
class CarSocket {
	constructor(params){
		self = this;
		self.socket = io(params.websockets_host);
		self.socket.on('connect', function(){
			console.log("Connected!");
		});

		self.socket.on('position', function (data) {
			pos = data;
			$("#info_pos").html(JSON.stringify([Math.round(pos.x), Math.round(pos.y)]));
			$("#info_rot").html(JSON.stringify([Math.round(pos.rot)]));
			console.log(data);
			operationInProgress = false;
			if(typeof draw == "function"){
				draw();
			}
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
