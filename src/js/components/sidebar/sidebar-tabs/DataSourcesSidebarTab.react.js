var React = require('react-with-addons');
var ViewMixin = require('../../../mixins/ViewMixin');
var DataSourcesStore = require('../../../stores/DataSourceStore');
var Icon = require('../../utils/Icon.react');

var DataSourcesSidebarTab = React.createClass({

  statics: {
    title: 'data sources'
  },

  mixins: [ViewMixin(DataSourcesStore)],

  getStateFromStore: function getStateFromStore() {
    return {
      dataSources: DataSourcesStore.getDataSources
    };
  },

  render: function() {
    var dataSources = this.state.dataSources.map(function(dataSource) {
      return (
        <tr>
          <td>{dataSource.name}</td>
          <td><DialogButton dialog={DataSourceDialog} dataSource={dataSource}><Icon type="preview"/></DialogButton></td>
          <td><DialogButton dialog={DataSetDialog} dataSource={dataSource}><Icon type="dataSet"/></DialogButton></td>
        </tr>
      );
    }, this);

    return (
      <div>
        <table className="table">
          {dataSources}
        </table>
      </div>
    );
  }

});

module.exports = DataSourcesSidebarTab;