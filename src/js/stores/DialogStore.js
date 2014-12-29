var AppDispatcher = require('../dispatcher/AppDispatcher');
var StoreMixin = require('../mixins/StoreMixin');
var AppConstants = require('../constants/AppConstants');
var FocusedMode = require('../constants/FocusedModeConstants');
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
 * Object containing cached React Component Factories
 * for various types of Dialogs
 * @type {Object<Function>}
 * @private
 */
var _dialogStack = {};

/**
 * String storing name of active dialog type
 * when dialog windows is opened
 * @type {?String}
 * @private
 */
var _dialogActive = null;

/**
 * Store for various application data
 * @mixes StoreMixin
 */
var DialogStore = merge(StoreMixin, {

  getDialogVisibility: function getDialogVisibility() {
    return _dialogVisibility;
  },

  getDialogRectangle: function getDialogRectangle() {
    return _dialogRectangle;
  },

  getDialogStack: function getDialogStack() {
    return _dialogActive ? [_dialogStack[_dialogActive]] : [];
  },

  CHANGE_VISIBILITY: function CHANGE_VISIBILITY(action) {
    _dialogVisibility = action.visibility;
  },

  OPEN: function OPEN(action) {
    _dialogRectangle = action.rectangle;
    if (!_dialogStack.hasOwnProperty(action.dialog.displayName)) {
      _dialogStack[action.dialog.displayName] = action.dialog;
    }
    _dialogActive = action.dialog.displayName;
    _dialogVisibility = true;
    _dialogVisibility = action.visibility;
  },

  CLEAR_RECTANGLE: function CLEAR_RECTANGLE(action) {
    _dialogRectangle = null;
  },

  HIDE: function HIDE(action) {
    _dialogVisibility = false;
  },

  dispatcherIndex: AppDispatcher.register(function dispatcher(payload) {
    var action = payload.action;

    if (DialogStore.hasOwnProperty(action.actionType)) {
      DialogStore[action.actionType](action);
    }
    DialogStore.emitChange();

    switch(action.actionType) {
    /** @event AppStore#setDialogVisibility */
      case AppConstants.CHANGE_DIALOG_VISIBILITY:
        AppStore.emitChange();
        break;

    /** @event AppStore#openDialog */
      case AppConstants.OPEN_DIALOG:
        AppStore.emitChange();
        break;

    /** @event AppStore#clearDialogRectangle */
      case AppConstants.CLEAR_DIALOG_RECTANGLE:
        AppStore.emitChange();
        break;

    /** @event AppStore#hideDialog */
      case AppConstants.HIDE_DIALOG:
        AppStore.emitChange();
        break;

    }

    return true;
  })

});

module.exports = DialogStore;