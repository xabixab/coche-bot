var blocks;

$(function(){
  cSocket = new CarSocket({
    host: "http://127.0.0.1:9000"
  });
  blocks = new BlocksManager("blocklyDiv", "codeDiv");
  $("#btn-run").click(blocks.execute);
  init();
});

function init(){

};

class BlocksManager {
  constructor(div, codediv){
    var self = this;
    self.codediv = codediv;
    $.get("toolbox.xml", function(data){
      self.workspace = Blockly.inject(div, {
            media: '/bower_components/google-blockly/media/',
            toolbox: new XMLSerializer().serializeToString(data)
      });

      setInterval(self.update, 1000);
    });
  }

  execute(){
    var self = this;

    console.log("GENERATED CODE START =====");
    console.log(self.code);
    console.log("GENERATED CODE END   =====");

    try {
      eval(self.code);
    } catch (e) {
      alert(e);
    }
  }

  update(){
    var self = this;
    var codeField = $("codeField");
    this.code = Blockly.JavaScript.workspaceToCode(self.workspace);
    codeField.html(self.code);
    console.log(self.clode);
  }
}
