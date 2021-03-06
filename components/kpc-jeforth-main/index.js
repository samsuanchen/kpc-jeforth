/** @jsx React.DOM */

var Input=Require("forthcommand"); 
var Output=Require("forthoutput"); 
var KsanaVm=require('./jeforth');

var out=[];
var main = React.createClass({displayName: 'main',
  getInitialState: function() {
    return {out:["ok>"] };
  },
  doExec:function(cmd) {
    this.vm.exec.apply(this.vm,[cmd]);
    this.setState({"out":out});
  }, 
  ticktype:function(t) {
    out.push(t);
   }, 
  render: function() { 
    return ( 
      React.DOM.div(null, 
        Input( {exec:this.doExec}),
        Output( {out:this.state.out})
      )
    );
  },
  componentDidMount:function() {
    this.vm=new KsanaVm();
    this.vm.ticktype=this.ticktype.bind(this);  

  }

});
module.exports=main;