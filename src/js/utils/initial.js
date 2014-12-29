var defaults = require('lodash').defaults;

var initialRegExp = /^(initial)([A-Z])(.*)$/;

function replaceInitial(exp, initial, firstLetter, rest) {
  return firstLetter.toLowerCase() + rest;
}

function defaultKey(initialKey) {
  initialKey.replace(initialRegExp, replaceInitial);
}

function initial(options, initialOptions) {
  var defaultOptions = {};
  var defaultKey;

  for (var initialKey in initialOptions) {
    if (!initialKey.match(/^initial[A-Z]/)) continue;
    defaultOptions[defaultKey(initialKey)] = initialOptions[initialKey];
  }

  return defaults(options, defaultOptions);
};

module.exports = initial;