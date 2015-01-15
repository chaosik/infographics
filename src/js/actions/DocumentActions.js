var AppDispatcher = require('../dispatcher/AppDispatcher');
var DocumentConstants = require('../constants/DocumentConstants');

var DocumentActions = {

  addDocument: function(document) {
    AppDispatcher.handleViewAction({
      actionType: DocumentConstants.ADD,
      document: document
    });
  },

  selectDocument: function(document) {
    AppDispatcher.handleViewAction({
      actionType: DocumentConstants.SELECT,
      document: document
    });
  },

  updateDocument: function (document) {
    AppDispatcher.handleViewAction({
      actionType: DocumentConstants.UPDATE,
      document: document
    });
  },

  removeDocument: function (document) {
    AppDispatcher.handleViewAction({
      actionType: DocumentConstants.REMOVE,
      document: document
    });
  }

};

module.exports = DocumentActions;