class Ranger {
  constructor(params){
    var self = this;
    self.xoffset = params.xoffset;
    self.yoffset = params.yoffset;
    self.posrot = Math.atan(self.yoffset / self.xoffset);
    console.log(self.posrot);
  }

  getCanvasPos(params){
    var self = this;
    return {
      x:that.yoffset * mmToCanvasCoords * Math.cos((- pos.rot) * Math.PI/180) + canvasCarPos.x,
		  y:that.xoffset * mmToCanvasCoords * Math.sin((- pos.rot) * Math.PI/180) + canvasCarPos.y
    }
  }

  drawRanger(){
    var that = this;
    var rangerDim = 2.5 * scale;
    var rangerPos = that.getCanvasPos();
    console.log(rangerPos);
    ctx.beginPath();
    ctx.arc(rangerPos.x, rangerPos.y , rangerDim, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'blue';
    ctx.fill();
  }
}
