var React = require('react-with-addons');

var DialogContent = React.createClass({

  render: function() {
    var rectangle = this.props.rectangle;
    var style = rectangle ? {
      left: rectangle.left,
      top: rectangle.top,
      width: rectangle.width,
      height: rectangle.height,
      transform: 'initial'
    } : {};

    //var noTransition = rectangle ? 'no-transition' : '';
    //
    //if (!timeout) {
    //  timeout = setTimeout(function clearDialogRectangleTimeout() {
    //    AppActions.clearDialogRectangle();
    //    timeout = null;
    //  });
    //}

    return (
      <div className="dialog-content" style={style} onClick={this.props.closeDialog}>
        {this.children}
      </div>
    );
  }

});

module.exports = DialogContent;