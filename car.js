var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;
var sleep = require('sleep');

//'use strict';
//let wrap = require('async-class').wrap;

var toRadians = Math.PI /   180;

class Car extends EventEmitter {
  constructor(params) {
    super();
    var self = this;
    this.params = params;
    this.position = this.params.initial_pos;
    self.lastPositionChangeInt = new Date().getTime();
  }

  getPos() {
    var self = this;
    return this.position;
  };

  setPos(pos) {
    var self = this;
    if(self.position !== pos){
      if(Math.round(self.position.x) != Math.round(pos.x) || Math.round(self.position.y) != Math.round(pos.y) || Math.round(self.position.rot) != Math.round(pos.rot)){
        var now = new Date().getTime();
        if(self.lastPositionChangeInt <= now - self.params.send_min_interval*1000){
          self.lastPositionChangeInt = new Date().getTime();
          self.emit("positionChangeInt");
        }
      }

      self.position = pos;
      self.emit('positionChange');
      return true;
    } else {
      return false;
    }
  }

  makeRect(distance, vel){
    var self = this;
    vel = Math.abs(vel); // Posible bug fixed.
    distance = distance - (distance % self.params.step_lenght); // This will set distance to a multiple of step_lengt
    var fragments = Math.abs(distance) / self.params.step_lenght;

    if(distance >= 0){
      var fragmentDistance = self.params.step_lenght;
    } else {
      var fragmentDistance = self.params.step_lenght * -1;
    }

    var intervalTime = self.params.step_lenght / vel; // LINEAR, NO ACCELERATION! t = x / v; // T IN Seconds!

    var remainingFragments = fragments;
    var step = setInterval(function(){
      self.setPos({
        x: self.getPos().x + fragmentDistance * Math.sin((90 - self.getPos().rot) * toRadians),
        y: self.getPos().y + fragmentDistance * Math.cos((90 - self.getPos().rot) * toRadians),
        rot: self.getPos().rot
      });
      remainingFragments--;
      if(remainingFragments == 0){
        clearInterval(step);
      }
    }, intervalTime * 1000); // *1000 to pass to mseconds
  }

  rotate(angle, vel){
  	var self = this;
  	angle = angle % 360;
  	if(angle % self.params.rotate_interval !== 0){
  		console.log("Warning! not exact angel! " + self.params.rotate_interval);
  	}
  	var carPos = self.getPos();

  	var intervalTime = 1000 / vel; // vel in º/s, passed to period.
  	var fragments = Math.round(angle / self.params.rotate_interval);
  	var remainingFragments = fragments;

  	var step = setInterval(function(){
  		var carPos = self.getPos();
  		var radius = self.params.car_dimensions.wheels;
  		self.setPos({
  			x: carPos.x + radius  - radius * Math.cos((carPos.rot + self.params.rotate_interval)*Math.PI/180),
  			y: carPos.y + Math.sin((carPos.rot + self.params.rotate_interval)*Math.PI/180),
  			rot: carPos.rot + self.params.rotate_interval,
  		});
  		remainingFragments--;
  		if(remainingFragments === 0){
  			clearInterval(step);
  		}
    }, intervalTime);
  }
}
module.exports = Car;
