var React = require('react-with-addons');

var DialogBase = React.createClass({

  propTypes: {
    dialogClass: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      rectangle: this.props.rectangle
    };
  },

  componentDidMount: function() {
    // Force browser reflow for animation to work
    this.getDOMNode().offsetHeight;
    this.setState({
      rectangle: null
    });
  },

  render: function() {
    var rectangle = this.state.rectangle;
    var style = rectangle ? {
      left: rectangle.left,
      top: rectangle.top,
      width: rectangle.width,
      height: rectangle.height,
      transform: 'initial'
    } : {};

    var className = 'dialog' + (rectangle ? ' no-transition' : '');
    if (this.props.dialogClass) {
      className += ' ' + this.props.dialogClass;
    }

    return (
      <div className={className} style={style}>
        {this.props.children}
      </div>
    );
  }

});

module.exports = DialogBase;