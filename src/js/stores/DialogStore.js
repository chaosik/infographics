var AppDispatcher = require('../dispatcher/AppDispatcher');
var StoreMixin = require('../mixins/StoreMixin');
var DialogConstants = require('../constants/DialogConstants');
var FocusedMode = require('../constants/FocusedModeConstants');
var DialogComponent = require('../utils/DialogComponent');
var _ = require('lodash');
var merge = _.merge;

/**
 * Flag describing visibility of Dialog window
 * @type {boolean}
 * @private
 */
var _dialogVisibility = false;

/**
 * Rectangle for dialog appearing animation
 * @type {?ClientRect}
 * @private
 */
var _dialogRectangle = null;

/**
 * Array of opened dialogs stacked
 * @type {DialogComponent[]}
 * @private
 */
var _dialogStack = [];

/**
 * String storing name of active dialog type
 * when dialog windows is opened
 * @type {?String}
 * @private
 */
var _dialogActive = null;

/**
 * Store for dialog stacking
 * @mixes StoreMixin
 * @singleton
 */
var DialogStore = merge({}, StoreMixin, {

  getDialogStack: function getDialogStack() {
    return _dialogStack;
  },

  openDialog: function openDialog(dialog, props) {
    _dialogStack.push(new DialogComponent(dialog, props));
  },

  closeDialog: function closeDialog() {
    _dialogStack.length = _dialogStack.length - 1;
  },

  dispatcherIndex: AppDispatcher.register(function dispatch(payload) {
    var action = payload.action;

    switch (action.actionType) {

      case DialogConstants.OPEN:
        DialogStore.openDialog(action.dialog, action.props);
        break;

      case DialogConstants.CLOSE:
        DialogStore.closeDialog();
        break;

      default:
        return true;
    }
    DialogStore.emitChange();
    return true;
  })

});


/**************************************************************************************
 *                                   Actions
 **************************************************************************************/

DialogStore[DialogConstants.OPEN] = function dialogOpen(action) {
  _dialogRectangle = action.rectangle;
  if (!_dialogStack.hasOwnProperty(action.dialog.displayName)) {
    _dialogStack[action.dialog.displayName] = action.dialog;
  }
  _dialogActive = action.dialog.displayName;
  _dialogVisibility = true;
  _dialogVisibility = action.visibility;
};

DialogStore[DialogConstants.CLEAR_RECTANGLE] = function dialogClearRectangle(action) {
  _dialogRectangle = null;
};

DialogStore[DialogConstants.HIDE] = function dialogHide(action) {
  _dialogVisibility = false;
};

module.exports = DialogStore;