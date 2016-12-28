var SerialPort = require('serialport');
var PORT = '/dev/ttyACM1';
var port = new SerialPort(PORT, {
  baudRate: 115200
});
var ready;

port.on('open', function() {
	 console.log('Init');
	// console.log(port);
    port.on('data',function(data){
  	if(data.toString() === "1"){
  		ready = true;
  		port.write('ABEFEFEFE', function(err) {
	    	if (err) {
	      		return console.log('Error on write: ', err.message);
	    	}
  		});
    
  	    }
    });


  
    /*if(ready){
  port.write('ABEFEF', function(err) {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
  // port.drain();
    console.log('message written');

 /*    port.write('EF', function(err) {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    //console.log('message written');
  });*/

  


});
