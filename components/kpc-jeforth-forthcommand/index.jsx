/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var forthcommand = React.createClass({
  sendCmd:function() {
    var cmd=this.refs["cmd"].getDOMNode().value;
    this.props.exec(cmd);
  },
  reload:function(){
    var gui=global.window.nwDispatcher.requireNwGui();
    var win = gui.Window.get();
    gui.App.clearCache();
    win.reload();
  },
  render: function() {
    return (
      <div className="forthcommand">
      <input ref="cmd" defaultValue=": sq dup * ; : 2sq sq 2 * ; 3 2sq ."/>
      <button onClick={this.sendCmd}>EXEC</button>
      <button onClick={this.reload}>Reload</button>
      </div>
    );
  }
});
module.exports=forthcommand;