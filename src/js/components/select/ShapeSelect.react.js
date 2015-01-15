var React = require('react-with-addons');
var property = require('lodash').property;
var ShapeStore = require('../../stores/ShapeStore');
var ConstantsSelect = require('./ConstantsSelect.react');

var ShapeSelect = React.createClass({

  propTypes: {
    onChange: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      options: []
    };
  },

  componentDidMount: function () {
    var that = this;
    ShapeStore.getShapes().then(function (shapes) {
      if (that.isMounted()) {
        that.setState({
          options: shapes
        });
      }
    });
  },

  render: function render() {
    return (
      <ConstantsSelect
        options={this.state.options}
        onChange={this._onChange}
        getText={property('name')}
        placeholder='select a shape' />
    );
  },

  _onChange: function (shape) {
    this.props.onChange(shape ? shape.name : null);
  }

});

module.exports = ShapeSelect;