
var five = require("johnny-five");
var Emitter = require("events").EventEmitter;
var util = require("util");

function Sentsoreak(opts){
	var self = this;
	var board;
	if(typeof opts == "undefined"){
		opts = {};
	}
	var board = new five.Board({repl:false,port:opts.port});

	var data1, data2;

	board.on("ready", function() {
		self.emit('sens:ready');
	  	

		var sens1 = new five.Proximity({
		  controller: "HCSR04",
		  pin: 7
		});

		var sens2 = new five.Proximity({
		  controller: "HCSR04",
		  pin: 8
		});


		sens1.on('change',function(data){
			data1 = data.cm;
			sendData();
		});

		sens2.on('change',function(data){
			data2 = data.cm;
			sendData();
		});

		
		
	});
	var sendData = function(){
		if(opts.debug)console.log(data1 + ":" + data2);
		self.emit('sens:change',{sens1:data1,sens2:data2});
	}
	return self;
}
util.inherits(Sentsoreak, Emitter);
module.exports = Sentsoreak;


