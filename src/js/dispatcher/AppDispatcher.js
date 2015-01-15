var Dispatcher = require('./Dispatcher');
var merge = require('lodash').merge;

/**
 * @mixes Dispatcher
 */
var AppDispatcher = merge({}, Dispatcher.prototype, {

  /**
   * A bridge function between the views and the dispatcher, marking the action
   * as a view action.  Another variant here could be handleServerAction.
   * @param  {object} action The data coming from the view.
   * @param {string} action.actionType
   */
  handleViewAction: function(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  },

  handleServerAction: function(action) {
    this.dispatch({
      source: 'SERVER_ACTION',
      action: action
    });
  }

});

module.exports = AppDispatcher;