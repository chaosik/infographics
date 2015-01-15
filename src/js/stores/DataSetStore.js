var AppDispatcher = require('../dispatcher/AppDispatcher');
var StoreMixin = require('../mixins/StoreMixin');
var DataSetConstants = require('../constants/DataSetConstants');
var _ = require('lodash');
var merge = _.merge;

var _dataSets = [];

/**
 * Store for data sources
 * @mixes StoreMixin
 * @singleton
 */
var DataSetStore = merge({}, StoreMixin, {

  getDataSets: function getDataSets() {
    return _dataSets;
  },

  createDataSet: function getDataSets(dataSet) {
    _dataSets.push(dataSet);
  },

  editDataSets: function getDataSets(dataSet) {
    var index = _dataSets.indexOf(dataSet);
    if (index !== -1) {
      _dataSets[index] = dataSet;
    }
  },

  removeDataSet: function getDataSets(dataSet) {
    var index = _dataSets.indexOf(dataSet);
    if (index !== -1) {
      _dataSets.splice(index, 1);
    }
  },

  dispatcherIndex: AppDispatcher.register(function dispatch(payload) {
    var action = payload.action;

    switch (action.actionType) {

      case DataSetConstants.ADD:
        DataSetStore.createDataSet(action.dataSet);
        break;

      case DataSetConstants.EDIT:
        DataSetStore.editDataSets(action.dataSet);
        break;

      case DataSetConstants.REMOVE:
        DataSetStore.removeDataSet(action.dataSet);
        break;

      default:
        return true;
    }
    DataSetStore.emitChange();
    return true;
  })

});

module.exports = DataSetStore;