var React = require('react-with-addons');

var Model = React.createClass({
  render: function() {
    return (
      <rect
        width={this.props.model.width}
        height={this.props.model.height}
        fill={this.props.model.color}
      />
    );
  }
});

module.exports = Model;