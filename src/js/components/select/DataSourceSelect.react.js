var React = require('react-with-addons');
var ViewMixin = require('../../mixins/ViewMixin');
var DataSourceStore = require('../../stores/DataSourceStore');
var DataSourceActions = require('../../actions/DataSourceActions');
var ConstantsSelect = require('./ConstantsSelect.react');
var property = require('lodash').property;

var DataSourceSelect = React.createClass({

  mixins: [ViewMixin(DataSourceStore)],

  getStateFromStore: function getStateFromStore() {
    return {
      selectedIndex: DataSourceStore.getSelectedDataSourceIndex(),
      options: DataSourceStore.getDataSources()
    };
  },

  componentDidMount: function() {
    //if (this.state.selectedIndex !== "-1") {
    //  this.props.onChange(this.state.options[this.state.selectedIndex]);
    //}
  },

  render: function render() {
    return (
      <ConstantsSelect
        options={this.state.options}
        value={this.state.selectedIndex}
        onChange={this._onChange}
        placeholder={this.state.options.length ? 'select a data source' : 'upload data source first'}
        getText={property('name')} />
    );
  },

  _onChange: function onChange(dataSource, index) {
    DataSourceActions.selectDataSourceIndex(index);
  }

});

module.exports = DataSourceSelect;