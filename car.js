var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;

function Car(params) {
  this._params = params;
  this.position = params.initial_pos;
}

Car.prototype.getPos = function () {
  return this.position;
};

Car.prototype.setPos = function(pos) {
  if(this.position !== pos){
    this.position = pos;
    this.emit('positionChange');
    return true;
  } else {
    return false;
  }
}

inherits(Car, EventEmitter);

module.exports = Car;

/*
class Car {
  constructor(params) {
    this._params = params;
    this.position = params.initial_pos;
  }

  getPos = function () {
    return this.position;
  };

  setPos = function(pos) {
    if(this.position !== pos){
      this.position = pos;
      this.emit('positionChange');
      return true;
    } else {
      return false;
    }
  }
  inherits(Car, EventEmitter);

}

module.exports = Car;
*/
