var AppDispatcher = require('../dispatcher/AppDispatcher');
var DataSourceConstants = require('../constants/DataSourceConstants');

var DataSourceAction = {

  addDataSource: function (dataSource) {
    AppDispatcher.handleViewAction({
      actionType: DataSourceConstants.ADD,
      dataSource: dataSource
    });
  },

  selectDataSourceIndex: function (index) {
    AppDispatcher.handleViewAction({
      actionType: DataSourceConstants.SELECT,
      index: index
    });
  }

};

module.exports = DataSourceAction;