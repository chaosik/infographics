var AppDispatcher = require('../dispatcher/AppDispatcher');
var StoreMixin = require('../mixins/StoreMixin');
var FilesToReadConstants = require('../constants/FilesToReadConstants');
var DataSourceActions = require('../actions/DataSourceActions');
var CSV = require('csv-js');
var _ = require('lodash');
var merge = _.merge;


/**
 * Array of File object that needs to be read
 * @type {File[]}
 * @private
 */
var _filesToRead = [];

/**
 * Store for data sources
 * @mixes StoreMixin
 * @singleton
 */
var FilesToReadStore = merge({}, StoreMixin, {

  getFilesToRead: function getFilesToRead() {
    return _filesToRead;
  },

  addFilesToRead: function addFilesToRead(fileList) {
    _filesToRead = _filesToRead.concat(fileList);
  },

  removeFileToRead: function removeFileToRead(file) {
    var index = _filesToRead.indexOf(file);
    if (index !== -1) {
      _filesToRead.splice(index, 1);
    }
  },

  /**
   * @param {File[]} fileList
   */
  upload: function upload(fileList) {
    fileList.forEach(function readContent(file) {
      var reader = new FileReader();
      reader.onload = function onFileLoad(event) {
        var data;
        var content = event.target.result;

        try {
          if (file.type === 'application/vnd.ms-excel') {
            data = CSV.parse(content);
          } else if (file.type === 'text/xml') {
            data = new DOMParser().parseFromString(content, file.type);
          } else {
            data = JSON.parse(content);
          }
        } catch (e) {
          data = content;
        }

        DataSourceActions.addDataSource({
          content: content,
          data: data,
          type: file.type,
          name: file.name
        });
        var index = _filesToRead.indexOf(file);
        if (index !== -1) {
          _filesToRead.splice(index, 1);
        }
        FilesToReadStore.emitChange();
      };
      reader.readAsText(file);
    });
  },

  dispatcherIndex: AppDispatcher.register(function dispatch(payload) {
    var action = payload.action;

    switch (action.actionType) {

      case FilesToReadConstants.UPLOAD:
        FilesToReadStore.upload(action.fileList);
        break;

      case FilesToReadConstants.ADD:
        FilesToReadStore.addFilesToRead(action.fileList);
        break;

      case FilesToReadConstants.REMOVE:
        FilesToReadStore.removeFileToRead(action.file);
        break;

      default:
        return true;
    }
    FilesToReadStore.emitChange();
    return true;
  })

});

module.exports = FilesToReadStore;