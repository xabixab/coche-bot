var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;

var method = Car.prototype;

function Car(params) {
    this._params = params;
    this.position = params.initial_pos;
}

method.getPos = function() {
  return this.position;
};

method.setPos = function(pos) {
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
