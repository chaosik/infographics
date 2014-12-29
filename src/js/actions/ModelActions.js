var AppDispatcher = require('../dispatcher/AppDispatcher');
var ModelConstants = require('../constants/ModelConstants');

var ModelActions = {
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

  destroy: function(id) {
    AppDispatcher.handleViewAction({
      actionType: ModelConstants.MODEL_DESTROY
    });
  }
};

module.exports = ModelActions;