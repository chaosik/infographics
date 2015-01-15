var React = require('react-with-addons');
var merge = require('lodash').merge;

function SelectMixin(mixinOverride) {

  return merge({

    propTypes: {
      onChange: React.PropTypes.func.isRequired
    },

    getInitialState: function () {
      return {
        selectedIndex: "-1"
      };
    },

    render: function render() {
      var options = [<option value="-1" key="-1">{this._getPlaceholder()}</option>].concat(
        this.state.options.map(function (item, index) {
          return <option value={index} key={index}>{this._getText(item, index)}</option>;
        })
      );
      var defaultValue = this.props.defaultValue === undefined ? "-1" : this.props.defaultValue;

      return (
        <select value={defaultValue} onChange={this._onChange}>
          {options}
        </select>
      );
    },

    _onChange: function onChange(event) {
      var index = parseInt(event.target.value, 10);
      this.setState({
        selectedIndex: index
      });
      var item = index !== -1 ? this.state.options[index] : null;
      this.props.onChange(this._getValue(item));
    },

    _getText: function(item) {
      return item.name;
    },

    _getValue: function (item) {
      return item.value;
    }
  }, mixinOverride);
}

module.exports = SelectMixin;