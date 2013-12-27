/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var forthcommand = React.createClass({
  sendCmd:function() {
    var cmd=this.refs["cmd"].getDOMNode().value;
    this.props.exec(cmd);
  },
  render: function() {
    return (
      <div>
      <input ref="cmd" defaultValue=": sq dup * ; : 2sq sq 2 * ; 3 2sq ."/><button onClick={this.sendCmd}>EXEC</button>
      </div>
    );
  }
});
module.exports=forthcommand;