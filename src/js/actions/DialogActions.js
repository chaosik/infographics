var AppDispatcher = require('../dispatcher/AppDispatcher');
var DialogConstants = require('../constants/DialogConstants');

var DialogActions = {

  /**
   * @emits DialogStore#OPEN
   * @see DialogStore#OPEN
   * @event DialogStore#OPEN
   * @param {ClientRect} rectangle
   * @param {ReactComponent} dialog
   */
  openDialog: function (rectangle, dialog) {
    AppDispatcher.handleViewAction({
      actionType: DialogConstants.OPEN,
      rectangle: rectangle,
      dialog: dialog
    });
  },

  /**
   * @fires AppStore#clearDialogRectangle
   */
  clearDialogRectangle: function () {
    AppDispatcher.handleViewAction({
      actionType: DialogConstants.CLEAR_RECTANGLE
    });
  },

  /**
   * @fires AppStore#hideDialog
   */
  hideDialog: function () {
    AppDispatcher.handleViewAction({
      actionType: DialogConstants.HIDE
    });
  }

};

module.exports = DialogActions;