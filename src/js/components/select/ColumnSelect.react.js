var React = require('react-with-addons');
var ViewMixin = require('../../mixins/ViewMixin');
var DataSourceStore = require('../../stores/DataSourceStore');
var ConstantsSelect = require('./ConstantsSelect.react');

var ColumnSelect = React.createClass({

  propTypes: {
    onChange: React.PropTypes.func.isRequired
  },

  mixins: [ViewMixin(DataSourceStore)],

  getStateFromStore: function getStateFromStore() {
    return {
      options: DataSourceStore.getDataSourceColumns()
    };
  },

  render: function render() {
    if (this.state.options === null) {
      return <select disabled="disabled"><option>Select dataSource first</option></select>;
    } else {
      return (
        <ConstantsSelect
          value={this.props.value}
          options={this.state.options}
          onChange={this.props.onChange}
          placeholder='select a column' />
      );
    }
  }

});

module.exports = ColumnSelect;