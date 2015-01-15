var React = require('react-with-addons');
var ViewMixin = require('../../../../mixins/ViewMixin');
var DataSourceStore = require('../../../../stores/DataSourceStore');

var DataSourceSelect = React.createClass({

  mixins: [ViewMixin(DataSourceStore)],

  getStateFromStore: function () {
    return {
      dataSources: DataSourceStore.getDataSources(),
      selectedIndex: this.props.selectedIndex
    };
  },

  render: function render() {
    var options = this.state.dataSources.map(function(dataSource, index) {
      return <option value={index} key={index}>{dataSource.name}</option>;
    });
    options.unshift(<option value={null} key="-1">Choose a dataSource</option>);

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
    this.props.onSelect(this.state.dataSources[value]);
  }

});

module.exports = DataSourceSelect;