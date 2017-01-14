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
  }

  getPos() {
    var self = this;
    return this.position;
  };

  setPos(pos) {
    var self = this;
    if(self.position !== pos){
      self.position = pos;
      self.emit('positionChange');
      return true;
    } else {
      return false;
    }
  }

  makeRect(distance, vel){
    var self = this;
    var tTot = distance / vel;
    var fragmentos = tTot / self.params.time_unit;
    var intervalDistance = distance / fragmentos;
    var interval = setInterval(function(){
      self.setPos({
        x: self.getPos().x + intervalDistance * Math.sin((90 - self.getPos().rot) * toRadians),
        y: self.getPos().y + intervalDistance * Math.cos((90 - self.getPos().rot) * toRadians),
        rot: self.getPos().rot
      });
      fragmentos--;
      if(fragmentos == 0){
        clearInterval(interval);
      }
    }, self.params.time_unit * 1000);
/*
    for (var i = 0; i != distance; i = i + unitDistance) {
      that.setPos({
        x: that.getPos().x + unitDistance * Math.sin((90 - that.getPos().rot) * toRadians),
        y: that.getPos().y + unitDistance * Math.cos((90 - that.getPos().rot) * toRadians),
        rot: that.getPos().rot
      });
      sleep.msleep(this.params.time_unit * 1000);
    }*/
  }
}
module.exports = Car;
