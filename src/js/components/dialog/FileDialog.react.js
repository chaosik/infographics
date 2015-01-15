var React = require('react-with-addons');
var FileInput = require('../utils/FileInput.react');
var FilesToReadList = require('./FileDialog/FilesToReadList.react.js');
var Icon = require('../utils/Icon.react');
var ViewMixin = require('../../mixins/ViewMixin');
var DialogCloseButton = require('./utils/DialogCloseButton.react.js');
var FilesToReadActions = require('../../actions/FilesToReadActions');
var FilesToReadStore = require('../../stores/FilesToReadStore');

/**
 * @state {BoundRect} rectangle
 * @state {?FileList} fileList
 */
var FileDialog = React.createClass({

  mixins: [ViewMixin(FilesToReadStore)],

  getStateFromStore: function getStateFromStore() {
    return {
      fileList: FilesToReadStore.getFilesToRead()
    };
  },

  render: function render() {
    return (
      <div>
        <DialogCloseButton/>
        Enter files to make new data sources:
        <FileInput onChange={this._onFileListChange} multiple={true}/>
        <FilesToReadList items={this.state.fileList} onRemoveItem={this._onRemoveItem}/>
        <button onClick={this._uploadDataSources} className="btn btn-primary">
          Wyślij <Icon type="upload" />
        </button>
      </div>
    );
  },

  /**
   * Method sent down to FileInput to read fileList
   * @param {File[]} files
   */
  _onFileListChange: function onFileListChange(files) {
    FilesToReadActions.addFilesToRead(files);
  },

  /**
   * When not read yet file is removed
   * @param {File} file
   */
  _onRemoveItem: function onRemoveItem(file) {
    FilesToReadActions.removeFileToRead(file);
  },

  /**
   * When user wants to read files
   */
  _uploadDataSources: function uploadDataSources() {
    FilesToReadActions.uploadFileList(this.state.fileList);
  }

});

module.exports = FileDialog;