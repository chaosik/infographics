var AppDispatcher = require('../dispatcher/AppDispatcher');
var DataSetConstants = require('../constants/DataSetConstants');

var DataSetAction = {

  add: function add(dataSet) {
    AppDispatcher.handleViewAction({
      actionType: DataSetConstants.ADD,
      dataSet: dataSet
    });
  },

  edit: function edit(dataSet) {
    AppDispatcher.handleViewAction({
      actionType: DataSetConstants.EDIT,
      dataSet: dataSet
    });
  },

  remove: function(dataSet) {
    AppDispatcher.remove({
      actionType: DataSetConstants.REMOVE,
      dataSet: dataSet
    });
  }

};

module.exports = DataSetAction;