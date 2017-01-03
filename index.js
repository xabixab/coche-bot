var fs = require("fs");
var config =  JSON.parse(fs.readFileSync(__dirname + "/config.json"));
var observed = require('observed')
var express = require('express');
var app = express();

var server = app.listen(config.webport);
var io = require('socket.io')(server);
var pos = config.initial_pos;

app.use(express.static(__dirname + '/static'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

io.on('connection', function (socket) {
	console.log("connection!");
	socket.emit('position', pos);

	socket.on('mvrect', function(params){
		console.log(params);
		var h = params.distance;
		console.log(h);
		var x =  h / Math.sin((90 - pos.rot)*Math.PI/180);
		console.log(x);
		var y = Math.sqrt(Math.pow(h, 2) - Math.pow(x, 2));
		console.log(y);
		console.log("X: " + x.toString() + "Y: " + y.toString());
	});
});

Object.observe(pos, function () {
  io.emit('position', pos);
  console.log("New Pos:" + JSON.stringify(pos));
});

console.log("Loading sensors...")
var Sentsoreak = require(__dirname + '/sentsoreak');
var sens = new Sentsoreak({testMode:true}); //arduino pins: 7,8
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
