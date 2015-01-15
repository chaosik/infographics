var AppDispatcher = require('../dispatcher/AppDispatcher');
var ModelConstants = require('../constants/ModelConstants');

var ModelActions = {

  fetchModelsFor: function(documentId) {
    AppDispatcher.handleServerAction({
      actionType: ModelConstants.FETCH,
      documentId: documentId
    });
  },

  saveModel: function (data) {
    AppDispatcher.handleViewAction({
      actionType: ModelConstants.SAVE,
      data: data
    });
  },

  create: function(el) {
    AppDispatcher.handleViewAction({
      actionType: ModelConstants.MODEL_CREATE,
      el: el
    });
  },

  update: function(id, el) {
    AppDispatcher.handleViewAction({
      actionType: ModelConstants.MODEL_UPDATE,
      id: id,
      el: el
    });
  },

  moveZUp: function (index) {
    AppDispatcher.handleViewAction({
      actionType: ModelConstants.Z_UP,
      index: index
    });
  },

  moveZDown: function (index) {
    AppDispatcher.handleViewAction({
      actionType: ModelConstants.Z_DOWN,
      index: index
    });
  },

  select: function (index) {
    AppDispatcher.handleViewAction({
      actionType: ModelConstants.SELECT,
      index: index
    });
  },

  destroy: function(id) {
    AppDispatcher.handleViewAction({
      actionType: ModelConstants.MODEL_DESTROY
    });
  }
};

module.exports = ModelActions;