var AppDispatcher = require('../dispatcher/AppDispatcher');
var StoreMixin = require('../mixins/StoreMixin');
var DataSourceConstants = require('../constants/DataSourceConstants');
var _ = require('lodash');
var merge = _.merge;


/**
 * Array of text files with content loaded
 * @type {Object[]}
 * @private
 */
var _dataSources = [];
window.dataSources = _dataSources;

/**
 * Index of selected dataSource
 * @type {Number}
 * @private
 */
var _selectedDataSourceIndex = -1;

function addDataSource(dataSource) {
  _dataSources.push(dataSource);
  if (_dataSources.length === 1) {
    _selectedDataSourceIndex = 0;
  }
}

/**
 * @param {Number} index
 */
function selectDataSource(index) {
  _selectedDataSourceIndex = index;
}

/**
 * Store for data sources
 * @mixes StoreMixin
 * @singleton
 */
var DataSourceStore = merge({}, StoreMixin, {

  getDataSources: function getDataSources() {
    return _dataSources;
  },

  getDataSourceColumns: function getDataSourceColumns() {
    if (_dataSources.length === 0 || _selectedDataSourceIndex === -1) {
      return null;
    }
    var dataSource = _dataSources[_selectedDataSourceIndex].data[0];
    var keys = [];
    for (var key in dataSource) {
      keys.push(key);
    }
    return keys;
  },

  getSelectedDataSource: function getSelectedDataSource() {
    if (_dataSources.length === 0 || _selectedDataSourceIndex === -1) {
      return null;
    }
    return _dataSources[_selectedDataSourceIndex];
  },

  getSelectedDataSourceIndex: function getSelectedDataSourceIndex() {
    return _selectedDataSourceIndex;
  },

  selectDataSourceIndex: function selectDataSourceIndex(index) {
    _selectedDataSourceIndex = index;
  },

  dispatcherIndex: AppDispatcher.register(function dispatch(payload) {
    var action = payload.action;

    switch (action.actionType) {

      case DataSourceConstants.ADD:
        addDataSource(action.dataSource);
        break;

      case DataSourceConstants.SELECT:
        selectDataSource(action.index);
        break;

      default:
        return true;
    }
    DataSourceStore.emitChange();
    return true;
  })

});

module.exports = DataSourceStore;

addDataSource({
  name: 'mock data source',
  data: require('./dataSourceMock')
});