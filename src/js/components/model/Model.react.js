var React = require('react-with-addons');



var Model = React.createClass({

  componentDidMount: function() {
    if (!this.props.modelData) {
      return;
    }
    var modelData = this.props.modelData;
    var collection = modelData.query(modelData.dataSource.data.slice(0, 10));
    modelData.template(this.getDOMNode(), collection, this.props.model);
  },

  render: function() {
    if (this.props.modelData) {
      return (
        <g
          width={this.props.model.width}
          height={this.props.model.height}
        />
      );
    } else {
      return (
        <rect
          width={this.props.model.width}
          height={this.props.model.height}
          fill={this.props.model.color}
        />
      );
    }
  }
});

module.exports = Model;