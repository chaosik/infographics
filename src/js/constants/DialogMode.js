var keyMirror = require('../utils/keyMirror');

/**
 * @readonly
 * @enum {String}
 */
var DialogMode = keyMirror({
  LIST: null,
  PREVIEW: null,
  EDITOR: null
});

module.exports = DialogMode;