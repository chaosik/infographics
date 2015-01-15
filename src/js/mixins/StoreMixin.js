var EventEmitter = require('events').EventEmitter;
var merge = require('lodash').merge;

var CHANGE_EVENT = 'change';

/**
 * Store for various application data
 * @mixes EventEmitter
 */
var StoreMixin = merge({}, EventEmitter.prototype, {

  /**
   * Give call to all change listeners to invoke callbacks
   * @event
   */
  emitChange: function emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * Register a callback to be invoked on emit change event
   * @param {Function} callback
   */
  addChangeListener: function addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * Remove provided callback from on change event listening
   * @param {Function} callback
   */
  removeChangeListener: function removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});


module.exports = StoreMixin;