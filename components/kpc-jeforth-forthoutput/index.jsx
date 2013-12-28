/** @jsx React.DOM */

//var othercomponent=Require("other"); 
var forthoutput = React.createClass({
  render: function() {
    return (
      <pre className="forthoutput">
    {
        this.props.out.map(function(O){
          return O;
        }).join("\n")
      }

      </pre>
    );
  }
});
module.exports=forthoutput;
