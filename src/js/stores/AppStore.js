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
 * Store for various application data
 * @mixes StoreMixin
 */
var AppStore = merge({}, StoreMixin, {

  getFocusedMode: function getFocusedMode() {
    return _focusedMode;
  },

  getSidebarVisibility: function getSidebarVisibility() {
    return _sidebarVisibility;
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

      default:
        return true;
    }
    AppStore.emitChange();
    return true;
  })

});

module.exports = AppStore;