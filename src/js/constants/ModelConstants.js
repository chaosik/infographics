var mapValues = require('lodash').mapValues;

var prefix = 'MODEL_';

var ModelConstants = mapValues({
  CREATE: null,
  UPDATE: null,
  DESTROY: null,
  SAVE: null,
  FETCH: null,
  SELECT: null,
  Z_UP: null,
  Z_DOWN: null
}, function (val, key) {
  return prefix + key;
});

module.exports = ModelConstants;