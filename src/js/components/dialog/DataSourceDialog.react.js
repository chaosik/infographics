var React = require('react-with-addons');
var ViewMixin = require('../../mixins/ViewMixin');
var DataSourceList = require('./DataSourceDialog/DataSourceList.react');
var DataSourcePreview = require('./DataSourceDialog/DataSourcePreview.react');
var DialogMode = require('../../constants/DialogMode');
var DialogCloseButton = require('./utils/DialogCloseButton.react.js');

var DataSourceDialog = React.createClass({

  statics: {
    dialogClass: 'big-dialog'
  },

  getInitialState: function getInitialState() {
    return {
      mode: DialogMode.LIST,
      preview: null
    };
  },

  render: function render() {
    var content;
    if (this.state.mode === DialogMode.LIST) {
      content = <DataSourceList onPreview={this._previewDataSource}/>;
    } else {
      content = <DataSourcePreview dataSource={this.state.preview} onReturn={this._returnToList}/>;
    }

    return (
      <div>
        <DialogCloseButton/>
        data source dialog
        {content}
      </div>
    );
  },

  _previewDataSource: function(dataSource) {
    this.setState({
      preview: dataSource,
      mode: DialogMode.PREVIEW
    });
  },

  _returnToList: function() {
    this.setState({
      preview: null,
      mode: DialogMode.LIST
    });
  },

  _createDataSet: function(dataSource) {

  }

});

module.exports = DataSourceDialog;