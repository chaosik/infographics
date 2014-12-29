var AppDispatcher = require('../dispatcher/AppDispatcher');
var StoreMixin = require('../mixins/StoreMixin');
var ModelConstants = require('../constants/ModelConstants');
var GroupModelConstants = require('../constants/GroupModelConstants');
var _ = require('lodash');

var uniqueId = _.uniqueId;
var merge = _.merge;

var _models = {}; // collection of component items
/**
 * ID of focused model. When model is focused,
 * model.group.focused is set to true
 * @type {string}
 * @private
 */
var _focused = null;

function create(model) {
  var id = uniqueId('model_store_');
  model.id = id;
  _models[id] = model;
}

function update(id, newModel) {
  merge(_models[id], newModel);
}

function updateGroup(id, newGroup) {
  merge(_models[id].group, newGroup);
  if (_models[id].group.x < 0) { _models[id].group.x = 0; }
  if (_models[id].group.y < 0) { _models[id].group.y = 0; }
}


function focus(id) {
  if (_focused !== null && _models.hasOwnProperty(_focused)) {
    _models[_focused].group.focus = false;
  }

  _focused = id;
  _models[_focused].group.focus = true;
}

function destroy(id) {
  delete _models[id];
}

/**
 * @mixes StoreMixin
 */
var ModelStore = merge(StoreMixin, {

  getAll: function() {
    return _models;
  },

  /**
   * Return actually focused model or null if
   * no model is focused
   * @returns {Object|null}
   */
  getFocused: function() {
    if (_focused && _models[_focused]) {
      return _models[_focused];
    } else {
      return null;
    }
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
      case ModelConstants.CREATE:
        create(action.model);
        ModelStore.emitChange();
        break;

      case ModelConstants.DESTROY:
        destroy(action.id);
        ModelStore.emitChange();
        break;

      case GroupModelConstants.DRAG:
      case GroupModelConstants.UPDATE:
        updateGroup(action.id, action.group);
        ModelStore.emitChange();
        break;

      case GroupModelConstants.FOCUS:
        focus(action.id);
        ModelStore.emitChange();
        break;

    }

    return true;
  })

});

module.exports = ModelStore;

// TODO: remove mock
create({
  group: {
    x: 100,
    y: 100,
    scale: 1,
    rotation: 0,
    focus: false
  },
  model: {
    color: 'red',
    width: 100,
    height: 150
  }
});
create({
  group: {
    x: 20,
    y: 200,
    scale: 1.5,
    rotation: 0,
    focus: false
  },
  model: {
    color: 'blue',
    width: 100,
    height: 100
  }
});
create({
  group: {
    x: 50,
    y: 150,
    scale: 1,
    rotation: 30,
    focus: false
  },
  model: {
    color: 'yellow',
    width: 100,
    height: 100
  }
});