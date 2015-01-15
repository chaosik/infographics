var React = require('react-with-addons');
var Icon = require('../../utils/Icon.react');
var DataSourceStore = require('../../../stores/DataSourceStore');
var ViewMixin = require('../../../mixins/ViewMixin');

var DataSetList = React.createClass({

  propTypes: {
    onEdit: React.PropTypes.func.isRequired
  },

  mixins: [ViewMixin(DataSourceStore)],

  getStateFromStore: function getStateFromStore() {
    return {
      dataSets: []//DataSourceStore.getDataSets()
    };
  },

  render: function render() {
    var dataSources = this.state.dataSet.map(function(dataSource, index) {
      return (
        <tr key={"data-source-" + index}>
          <td>{dataSource.name}</td>
          <td><span onClick={this._editDataSet} data-index={index}><Icon type="edit"/></span></td>
          <td><span onClick={this._createModel} data-index={index}><Icon type="model"/></span></td>
        </tr>
      );
    }, this);

    return (
      <div>
        Data Sources:
        <button onClick={this._createDataSet}>Create DataSet</button>
        <table className="table data-source-list">
          {dataSources}
        </table>
      </div>
    );
  },

  _editDataSet: function previewDataSource(event) {
    var index = event.currentTarget.dataset.index;
    var dataSet = this.state.dataSets[index];
    this.props.onEdit(dataSet);
  },

  _createDataSet: function createDataSet() {
    this.props.onEdit(null);
  },

  _createModel: function createDataSet(dataSource) {
    console.log('create model');
  }

});

module.exports = DataSetList;