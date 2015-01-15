var React = require('react-with-addons');
var ViewMixin = require('../../../../mixins/ViewMixin');

var ColumnSelect = React.createClass({

  getInitialState: function() {
    return {
      selectedIndex: null
    };
  },

  render: function render() {
    if (this.props.dataSource) {
      var options = this.props.dataSource[0].map(function(column) {
        return <option value={column} key={column}>{column}</option>;
      });
      return (
        <select value={this.state.selectedIndex} onChange={this._onSelect}>
          {options}
        </select>
      );
    } else {
      return <select disabled="disabled"/>;
    }
  },

  _onSelect: function onSelect(event, value) {
    this.props.onSelect(this.state.dataSources[value]);
  }

});

module.exports = ColumnSelect;