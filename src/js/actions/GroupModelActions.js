var AppDispatcher = require('../dispatcher/AppDispatcher');
var GroupModelConstants = require('../constants/GroupModelConstants');

var GroupModelActions = {
  drag: function (id, group) {
    AppDispatcher.handleViewAction({
      actionType: GroupModelConstants.DRAG,
      id: id,
      group: group
    });
  },

  focus: function(id) {
    AppDispatcher.handleViewAction({
      actionType: GroupModelConstants.FOCUS,
      id: id
    });
  },

  update: function(id, group) {
    AppDispatcher.handleViewAction({
      actionType: GroupModelConstants.UPDATE,
      id: id,
      group: group
    });
  }
};

module.exports = GroupModelActions;