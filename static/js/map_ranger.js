class Ranger {
  constructor(params){
    var self = this;
    var self.xoffset = params.xoffset;
    var self.yoffset = params.yoffset;
  }

  private getCanvasPos(params){
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
