var AppDispatcher = require('../dispatcher/AppDispatcher');
var qwest = require('qwest');
var StoreMixin = require('../mixins/StoreMixin');
var UrlConstants = require('../constants/UrlConstants');
var _ = require('lodash');
var merge = _.merge;
var find = _.find;
var Promise = require('es6-promise').Promise;


var _shapes = [];

var shapePromise = new Promise(function fetchShapes(resolve, reject) {
  return qwest.get(UrlConstants.shapes)
    .then(function(result) {
      _shapes = result.Shapes.map(function(shape) {
        return {
          svg: shape.Svg,
          name: shape.Name
        };
      });
      resolve(_shapes);
    })
    .catch(function() {
      console.warn('can\'t fetch shapes');
      reject(new Error('can\'t fetch shapes'));
    });
});

/**
 * Store for various application data
 * @mixes StoreMixin
 */
var ShapeStore = merge({}, StoreMixin, {

  getShapes: function getShapes() {
    return shapePromise;
  },

  getShapeByName: function getShapeByName(shapeName) {
      var shape = find(_shapes, {name: shapeName});
      if (shape) {
        return shape.svg;
      } else {
        return new Error('Cannot find shape of name ' + shapeName + '.');
      }
  },

  dispatcherIndex: AppDispatcher.register(function dispatcher(payload) {
    var action = payload.action;

    switch(action.actionType) {

      default:
        return true;
    }
    ShapeStore.emitChange();
    return true;
  })

});

module.exports = ShapeStore;