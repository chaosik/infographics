var keyMirror = require('../utils/keyMirror');

/**
 * Enum for app oriented actions
 * store values which are same as keys
 * @readonly
 * @enum {string}
 */
var AppConstants = keyMirror({
  CHANGE_FOCUSED_MODE: '',
  CHANGE_SIDEBAR_VISIBILITY: '',
  CHANGE_DIALOG_VISIBILITY: '',
  OPEN_DIALOG: '',
  CLEAR_DIALOG_RECTANGLE: '',
  HIDE_DIALOG: ''
});

module.exports = AppConstants;