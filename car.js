var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;
/*
function Car(params) {
  this._params = params;
  this.position = this._params.initial_pos;
}

Car.prototype.getPos = function() {
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

*/

class Car extends EventEmitter {
  constructor(params) {
    super();
    this.params = params;
    this.position = this.params.initial_pos;
  }
  getPos() {
  return this.position;
  };
  setPos(pos) {
    if(this.position !== pos){
      this.position = pos;
      this.emit('positionChange');
      return true;
    } else {
      return false;
    }
  }
}
module.exports = Car;
