var AppDispatcher = require('../dispatcher/AppDispatcher');
var FilesToReadConstants = require('../constants/FilesToReadConstants');

var FilesToReadActions = {

  addFilesToRead: function addFilesToRead(fileList) {
    AppDispatcher.handleViewAction({
      actionType: FilesToReadConstants.ADD,
      fileList: fileList
    });
  },

  removeFileToRead: function removeFileToRead(file) {
    AppDispatcher.handleViewAction({
      actionType: FilesToReadConstants.REMOVE,
      file: file
    });
  },

  uploadFileList: function(fileList) {
    AppDispatcher.handleViewAction({
      actionType: FilesToReadConstants.UPLOAD,
      fileList: fileList
    });
  }

};

module.exports = FilesToReadActions;