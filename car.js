var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;
var sleep = require('sleep');

'use strict';
let wrap = require('async-class').wrap;

var toRadians = Math.PI /   180;

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

  *makeRect(distance, vel){
    var that = this;
    var unitVel = vel * this.params.time_unit;
    var unitDistance = unitVel * that.params.time_unit;

    for (var i = 0; i != distance; i = i + unitDistance) {
      that.setPos({
        x: that.getPos().x + unitDistance * Math.sin((90 - that.getPos().rot) * toRadians),
        y: that.getPos().y + unitDistance * Math.cos((90 - that.getPos().rot) * toRadians),
        rot: that.getPos().rot
      });
      sleep.msleep(this.params.time_unit * 1000);
    }
  }
}
module.exports = wrap(Car);
