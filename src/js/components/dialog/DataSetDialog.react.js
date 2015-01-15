var React = require('react-with-addons');
var ViewMixin = require('../../mixins/ViewMixin');
var DataSetList = require('./DataSetDialog/DataSetList.react');
var DataSetEditor = require('./DataSetDialog/DataSetEditor.react');
var DialogMode = require('../../constants/DialogMode');
var DialogCloseButton = require('./utils/DialogCloseButton.react.js');

var DataSetDialog = React.createClass({

  statics: {
    dialogClass: 'big-dialog'
  },

  getInitialState: function getInitialState() {
    return {
      view: DialogMode.EDITOR,
      dataSet: null
    };
  },

  render: function render() {
    var content;
    //if (this.state.view === DialogMode.LIST) {
    //  content = <DataSetList onEdit={this._editDataSet}/>;
    //} else {
      content = <DataSetEditor dataSet={this.state.dataSet} onReturn={this._returnToList}/>;
    //}

    return (
      <div>
        <DialogCloseButton/>
        {content}
      </div>
    );
  },

  _editDataSet: function(dataSet) {
    this.setState({
      dataSet: dataSet,
      mode: DialogMode.EDITOR
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

module.exports = DataSetDialog;