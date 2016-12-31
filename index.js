var O = require('observed')
var express = require('express');
var app = express();
var express = require('express');
var app = express();
var Sentsoreak = require('./sentsoreak');
var server = app.listen(9000, function () {
console.log('Position:' + pos.toString());
});
var io = require('socket.io')(server);

// X, Y, Rotation
var pos = {
	x: 0.0,
	y: 0.0,
	rot: 315.0
}

var radius = 50; // 50mm
var ws = 300; // Wheel separation in mm

app.use(express.static(__dirname + '/static'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

/*app.get('/', function (req, res)
});*/

app.get('/mvrect', function(req, res){
	pos.x = pos.x + 100;

});

app.get('/mvarc', function(req, res){

});


io.on('connection', function (socket) {
	console.log("connection!");
	socket.emit('position', pos);
});

Object.observe(pos, function () {
  io.emit('position', pos);
  console.log("Position changed!" + JSON.stringify(pos));
})


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
