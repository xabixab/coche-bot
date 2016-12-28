
var five = require("johnny-five");

var PORT = "/dev/ttyACM1";

var board = new five.Board({ port:PORT });

  board.on("ready", function() {

  	var data1, data2;

	var sens1 = new five.Proximity({
	  controller: "HCSR04",
	  pin: 7
	});

	var sens2 = new five.Proximity({
	  controller: "HCSR04",
	  pin: 8
	});


	sens1.on('change',function(data){
		//console.log("s1:" + data.cm);
		data1 = data.cm;
		printData();
	});

	sens2.on('change',function(data){
		//console.log("s2:" + data.cm);
		data2 = data.cm;
		printData();
	});

	var printData = function(){
		console.log(data1 + ":" + data2);
	}

});
