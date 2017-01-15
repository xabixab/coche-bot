var fs = require("fs");
var config =  JSON.parse(fs.readFileSync(__dirname + "/config.json"));
var sleep = require('sleep');
var express = require('express');
var app = express();
var server = app.listen(config.webport);
var io = require('socket.io')(server);
var Car = require(__dirname + "/car.js");

var toRadians = Math.PI / 180;

var car = new Car({
	initial_pos: config.initial_pos,
	step_lenght: config.step_lenght,
	send_min_interval: config.send_min_interval
});

app.use(express.static(__dirname + '/static'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.get('/getConfig', function (req, res) {
	var clientConfig = {
		"car_weights":config.car_weights,
		"car_dimensions": config.car_dimensions,
		"host": config.host
	}
  res.json(clientConfig);
})

io.on('connection', function (socket) {
	console.log("connection!");
	socket.emit('position', car.position);

	socket.on('mvrect', function(params){
		console.log(params);
		car.makeRect(params.distance, params.velocity);
	});
});

car.on("positionChange", function(){

})

car.on("positionChangeInt", function(){
	var carPos = car.getPos();
	var carPosRounded = {
		x: Math.round(carPos.x),
		y: Math.round(carPos.y),
		rot: Math.round(carPos.rot)
	}
	io.emit("position", carPosRounded);
	console.log(carPosRounded);
});

console.log("Loading sensors...")
var Sentsoreak = require(__dirname + '/sentsoreak');
var sens = new Sentsoreak({testMode:config.pure_mode}); //arduino pins: 7,8
var sens1,sens2;

sens.on('sens:ready',function(data){
	console.log("Sentsoreak prest!");
});
sens.on('sens:change',function(data){
	sens1 = data.sens1;
	sens2 = data.sens2;
});
app.get('/sens',function(req,res){
	res.json({sens1:sens1,sens2:sens2});
});
