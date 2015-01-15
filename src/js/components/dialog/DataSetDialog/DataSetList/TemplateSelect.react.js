var React = require('react-with-addons');
var ViewMixin = require('../../../../mixins/ViewMixin');
var TemplateConstants = require('../../../../constants/TemplateConstants');


var TemplateSelect = React.createClass({

  getInitialState: function () {
    return {
      selectedIndex: this.props.selectedIndex
    };
  },

  render: function render() {
    var options = TemplateConstants.map(function(template, index) {
      return <option value={index} key={index}>{template.name}</option>;
    });
    options.unshift(<option value={null} key="-1">Choose a template</option>);

    return (
      <select value={this.state.selectedIndex} onChange={this._onSelect}>
        {options}
      </select>
    );
  },

  _onSelect: function onSelect(event) {
    var value = event.currentTarget.value;
    value = value === "-1" ? null : value;
    this.setState({
      selectedIndex: value
    });
    this.props.onSelect(TemplateConstants[value]);
  }

});

module.exports = TemplateSelect;