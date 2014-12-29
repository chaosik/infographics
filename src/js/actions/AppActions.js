var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {

  /**
   * @fires setFocusedMode
   * @param {FocusedModeConstants} mode
   */
  changeFocusedMode: function(mode) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.CHANGE_FOCUSED_MODE,
      mode: mode
    });
  },

  /**
   * @fires setSidebarVisibility
   * @param {boolean} visibility
   */
  changeSidebarVisibility: function(visibility) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.CHANGE_SIDEBAR_VISIBILITY,
      visibility: visibility
    });
  },

  /**
   * @fires AppStore#opendialog
   * @param {ClientRect} rectangle
   * @para {ReactComponent} dialog
   */
  openDialog: function (rectangle, dialog) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.OPEN_DIALOG,
      rectangle: rectangle,
      dialog: dialog
    });
  },

  /**
   * @fires AppStore#cleardialogRectangle
   */
  clearDialogRectangle: function () {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.CLEAR_DIALOG_RECTANGLE
    });
  },

  /**
   * @fires AppStore#hideDialog
   */
  hideDialog: function () {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.HIDE_DIALOG
    });
  }

};

module.exports = AppActions;