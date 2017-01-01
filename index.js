var fs = require("fs");
var config =  JSON.parse(fs.readFileSync("config.json"));
var observed = require('observed')
var express = require('express');
var app = express();
var Sentsoreak = require('./sentsoreak');
var server = app.listen(config.webport);
var io = require('socket.io')(server);

var pos = config.initial_pos;

app.use(express.static(__dirname + '/static'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

/*app.get('/', function (req, res)
});*/

io.on('connection', function (socket) {
	console.log("connection!");
	socket.emit('position', pos);

	io.on('mvrect', function(data){
		console.log("mvrect: " + JSON.stringify(data));
	})
});

Object.observe(pos, function () {
  io.emit('position', pos);
  console.log("New Pos:" + JSON.stringify(pos));
});

var sens = new Sentsoreak(); //arduino pins: 7,8
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
