var React = require('react-with-addons');


var TemplatePropertyMixin = {

  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    defaultValue: React.PropTypes.string.isRequired
  },

  getInitialState: function () {
    return {
      value: this.props.defaultValue
    };
  },

  _onChange: function (event) {
    var value = event.target.value;
    this.setState({
      value: value
    });
    this.props.onChange(value);
  }

};

module.exports = TemplatePropertyMixin;