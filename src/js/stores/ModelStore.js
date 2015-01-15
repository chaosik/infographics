var qwest = require('qwest');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var StoreMixin = require('../mixins/StoreMixin');
var ModelConstants = require('../constants/ModelConstants');
var GroupModelConstants = require('../constants/GroupModelConstants');
var UrlConstants = require('../constants/UrlConstants');
var _ = require('lodash');
var uniqueId = _.uniqueId;
var merge = _.merge;
var cloneDeep = _.cloneDeep;

var _models = []; // collection of component items

var _selected = null;

function select(index) {
  _selected = index;
}

function setModelZUp(index) {
  var tmp = _models[index - 1];
  _models[index - 1] = _models[index];
  _models[index] = tmp;
}

function setModelZDown(index) {
  var tmp = _models[index + 1];
  _models[index + 1] = _models[index];
  _models[index] = tmp;
}

function update(index, newModel) {
  merge(_models[index], newModel);
}

function updateModelProperties(index, newGroup) {
  merge(_models[index].modelProperties, newGroup);
}

var _editedModel = null;

var modelDefaults = {
  name: '',
  column: null,
  query: null,
  template: null,
  templateProperties: null,
  modelProperties: {
    width: 100,
    height: 100,
    r: 0,
    sx: 1,
    sy: 1,
    z: 0
  }
};

function initEditModel(index) {
  if (index) {
    _editedModel = cloneDeep(_models[index]);
  } else {
    _editedModel = cloneDeep(modelDefaults);
  }
}

function updateEditModel(modelData) {
  merge(_editedModel, modelData)
}


/**
 * @mixes StoreMixin
 */
var ModelStore = merge({}, StoreMixin, {

  getModels: function() {
    return _models;
  },

  getModel: function (index) {
    return _models[index];
  },

  getSelectedIndex: function () {
    return _selected;
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
      case GroupModelConstants.DRAG:
      case GroupModelConstants.UPDATE:
        updateModelProperties(action.id, action.group);
        break;


      case ModelConstants.FETCH:
        /* eslint no-use-before-define: 0 */
        fetchModels(action.documentId);
        return true;

      case ModelConstants.SELECT:
        select(action.index);
        break;

      case ModelConstants.Z_UP:
        setModelZUp(action.index);
        break;

      case ModelConstants.Z_DOWN:
        setModelZDown(action.index);
        break;

      case ModelConstants.INIT_EDIT_MODEL:
        initEditModel(action.index);
        break;

      case ModelConstants.UPDATE_EDIT_MODEL:
        updateEditModel(action.model);
        break;

      default:
        return true;
    }

    ModelStore.emitChange();
    return true;
  })

});

function fetchModels(documentId) {
  qwest.get(UrlConstants.models + '/' + documentId)
    .then(function (result) {
      _models.length = 0;
      result.Models.map(function (model) {
        var templateProperties = {};
        model.ModelTemplateProperties.forEach(function(templateProperty) {
          templateProperties[templateProperty.TemplateProperty.Name] = templateProperty.Value;
        });

        return {
          key: uniqueId('model_'),
          name: model.Name,
          column: model.ColumnName,
          query: model.Query,
          template: model.Template.Name,
          templateProperties: templateProperties,
          modelProperties: {
            x: model.X,
            y: model.Y,
            sx: model.Sx,
            sy: model.Sy,
            r: model.R,
            z: model.Z
          }
        };
      }).forEach(function(model) {
        _models.push(model);
      });
      ModelStore.emitChange();
    })
    .catch(function () {
      console.warn('can\'t fetch models');
    });
}

module.exports = ModelStore;