var AppDispatcher = require('../dispatcher/AppDispatcher');
var qwest = require('qwest');
var StoreMixin = require('../mixins/StoreMixin');
var UrlConstants = require('../constants/UrlConstants');
var TemplateConstants = require('../constants/TemplateConstants');
var _ = require('lodash');
var merge = _.merge;
var find = _.find;
var Promise = require('es6-promise').Promise;

var _templates = [];

var templatePromise = new Promise(function fetchTemplates(resolve, reject) {
  return qwest.get(UrlConstants.templates)
    .then(function(result) {
      _templates = result.Templates.map(function(template) {
        var defaultProperties = {};

        return {
          template: find(TemplateConstants, {name: template.Name}).template,
          dataSetType: template.DataSetType.Name,
          name: template.Name,
          properties: template.TemplateProperties.map(function(templateProperty) {
            defaultProperties[templateProperty.Name] = templateProperty.DefaultValue;
            return {
              name: templateProperty.Name,
              type: templateProperty.TemplatePropertyType.Name,
              defaultValue: templateProperty.DefaultValue
            };
          }),
          defaultProperties: defaultProperties
        };
      });
      resolve(_templates);
    })
    .catch(function() {
      console.warn('can\'t fetch templates');
      reject(new Error('can\'t fetch templates'));
    });
});

/**
 * Store for various application data
 * @mixes StoreMixin
 */
var TemplateStore = merge({}, StoreMixin, {

  getTemplates: function getTemplates() {
    return templatePromise;
  },

  findTemplateByName: function (templateName) {
    return find(_templates, {name: templateName});
  },

  dispatcherIndex: AppDispatcher.register(function dispatcher(payload) {
    var action = payload.action;

    switch(action.actionType) {

      default:
        return true;
    }
    TemplateStore.emitChange();
    return true;
  })

});

module.exports = TemplateStore;