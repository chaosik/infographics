var React = require('react-with-addons');
var Icon = require('../../utils/Icon.react');
var DataSourceStore = require('../../../stores/DataSourceStore');
var ViewMixin = require('../../../mixins/ViewMixin');

var DataSourceList = React.createClass({

  propTypes: {
    onPreview: React.PropTypes.func.isRequired
  },

  mixins: [ViewMixin(DataSourceStore)],

  getStateFromStore: function getStateFromStore() {
    return {
      dataSources: DataSourceStore.getDataSources()
    };
  },

  render: function render() {
    var dataSources = this.state.dataSources.map(function(dataSource, index) {
      return (
        <tr key={"data-source-" + index}>
          <td>{dataSource.name}</td>
          <td><span onClick={this._previewDataSource} data-index={index}><Icon type="preview"/></span></td>
          <td><span onClick={this._createDataSet} data-index={index}><Icon type="dataSet"/></span></td>
        </tr>
      );
    }, this);

    return (
      <div>
        Data Sources:
        <table className="table data-source-list">
          {dataSources}
        </table>
      </div>
    );
  },

  _previewDataSource: function previewDataSource(event) {
    var index = event.currentTarget.dataset.index;
    var dataSource = this.state.dataSources[index];
    this.props.onPreview(dataSource);
  },

  _createDataSet: function createDataSet(dataSource) {
    console.log('create data set');
  }

});

module.exports = DataSourceList;