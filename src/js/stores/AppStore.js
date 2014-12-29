var AppDispatcher = require('../dispatcher/AppDispatcher');
var StoreMixin = require('../mixins/StoreMixin');
var AppConstants = require('../constants/AppConstants');
var FocusedMode = require('../constants/FocusedModeConstants');
var _ = require('lodash');
var merge = _.merge;


/**
 * Variable for defining if focused model contour
 * can resize, scale or rotate it
 * @type {FocusedMode}
 * @default {FocusedMode.RESIZE}
 */
var _focusedMode = FocusedMode.RESIZE;

/**
 * Flag for determining sidebar visibility
 * @type {boolean}
 * @private
 */
var _sidebarVisibility = false;

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
var AppStore = merge(StoreMixin, {

  getFocusedMode: function getFocusedMode() {
    return _focusedMode;
  },

  getSidebarVisibility: function getSidebarVisibility() {
    return _sidebarVisibility;
  },

  getDialogVisibility: function getDialogVisibility() {
    return _dialogVisibility;
  },

  getDialogRectangle: function getDialogRectangle() {
    return _dialogRectangle;
  },

  getDialogStack: function getDialogStack() {
    return _dialogActive ? [_dialogStack[_dialogActive]] : [];
  },

  dispatcherIndex: AppDispatcher.register(function dispatcher(payload) {
    var action = payload.action;

    switch(action.actionType) {
    /** @event setFocusedMode */
      case AppConstants.CHANGE_FOCUSED_MODE:
        _focusedMode = action.mode;
        break;

    /** @event AppStore#setSidebarVisibility */
      case AppConstants.CHANGE_SIDEBAR_VISIBILITY:
        _sidebarVisibility = action.visibility;
        break;

    /** @event AppStore#setDialogVisibility */
      case AppConstants.CHANGE_DIALOG_VISIBILITY:
        _dialogVisibility = action.visibility;
        break;

    /** @event AppStore#openDialog */
      case AppConstants.OPEN_DIALOG:
        _dialogRectangle = action.rectangle;
        if (!_dialogStack.hasOwnProperty(action.dialog.displayName)) {
          _dialogStack[action.dialog.displayName] = action.dialog;
        }
        _dialogActive = action.dialog.displayName;
        _dialogVisibility = true;
        break;

    /** @event AppStore#clearDialogRectangle */
      case AppConstants.CLEAR_DIALOG_RECTANGLE:
        _dialogRectangle = null;
        break;

    /** @event AppStore#hideDialog */
      case AppConstants.HIDE_DIALOG:
        _dialogVisibility = false;
        break;

      default:
        return true;

    }

    AppStore.emitChange();

    return true;
  })

});

module.exports = AppStore;