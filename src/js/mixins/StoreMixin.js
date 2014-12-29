var EventEmitter = require('events').EventEmitter;
var merge = require('lodash').merge;

var CHANGE_EVENT = 'change';

/**
 * Store for various application data
 * @mixes EventEmitter
 */
var StoreMixin = merge(EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});


module.exports = StoreMixin;