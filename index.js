var O = require('observed')
var express = require('express');  
var app = express();  
var server = app.listen(9000, function () {
  console.log('Position:' + pos.toString());
});
var io = require('socket.io')(server); 

// X, Y, Rotation
var pos = {
	x: 0.0,
	y: 0.0,
	rot: 45.0
}

var radius = 50; // 50mm
var ws = 400; // Wheel separation in mm

app.get('/', function (req, res) {
	res.redirect("/public");
});

app.get('/mvrect', function(req, res){
	pos.x = pos.x + 100;
	
});

app.get('/mvarc', function(req, res){

});

app.use('/public', express.static('static'));	
app.use('/public', express.static('bower_components'));



io.on('connection', function (socket) {
	console.log("connection!");
	socket.emit('position', pos);
});

Object.observe(pos, function () {
  io.emit('position', pos);
  console.log("Position changed!" + JSON.stringify(pos));
})
