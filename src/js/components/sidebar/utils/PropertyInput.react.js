var React = require('react-with-addons');

var PropertyInput = React.createClass({

  render: function() {
    return (
      <div className="form-group col-xs-6">
        <div className="input-group">
          <div className="input-group-addon">{this.props.property}:</div>
          <input className="form-control" type="number" ref="input" value={this.props.value} onChange={this._onChange} />
        </div>
      </div>
    );
  },

  _onChange: function() {
    var change = {};
    change[this.props.property] = this.refs.input.getDOMNode().value;
    this.props.onChange(this.props.property, change);
  }
});

module.exports = PropertyInput;