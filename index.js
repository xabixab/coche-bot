var fs = require("fs");
var config =  JSON.parse(fs.readFileSync(__dirname + "/config.json"));
var observed = require('observed')
var express = require('express');
var app = express();
var server = app.listen(config.webport);
var io = require('socket.io')(server);
var Car = require(__dirname + "/car.js");

var car = new Car({
	initial_pos: config.initial_pos,
});

app.use(express.static(__dirname + '/static'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

io.on('connection', function (socket) {
	console.log("connection!");
	socket.emit('position', car.position);

	socket.on('mvrect', function(params){
		console.log(params);
		var nx = car.getPos().x;
		var ny = car.getPos().y;
		var nr = car.getPos().rot;
		var newpos = {
			x: nx,
			y: ny,
			rot: nr
		}
		car.setPos(newpos)
	});
});

car.on("positionChange", function(){
	io.emit("position", car.getPosition());
})

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
