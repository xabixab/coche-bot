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
      x:self.xoffset * params.mmToCanvasCoords * Math.cos(pos.rot * Math.PI/180) + canvasCarPos.x,
		  y:self.yoffset * params.mmToCanvasCoords * Math.sin(pos.rot * Math.PI/180) + canvasCarPos.y
    }
  }

  drawRanger(params){
    var self = this;

    var rangerPos = getCanvasPos({
      mmToCanvasCoords: params.mmToCanvasCoords,
      canvasCarPos: params.canvasCarPos,
      carRot: params.carRot
    });
  }
}
