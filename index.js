	var express = require('express')
	var app = express()

	app.get('/', function (req, res) {
	  res.redirect("/public");
	})

	app.post('/mv', function(req, res){

	});

	app.use('/public', express.static('static'));	
	app.use('/public', express.static('bower-components'));

	app.listen(9000, function () {
	  console.log('Example app listening on port 9000!')
	})
