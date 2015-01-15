var React = require('react-with-addons');
var DocumentStore = require('../stores/DocumentStore');
var ViewMixin = require('../mixins/ViewMixin');
var ModelList = require('./model/ModelList.react');


var DocumentPreview = React.createClass({

  mixins: [ViewMixin(DocumentStore)],

  getStateFromStore: function getStateFromStore() {
    return {
      document: DocumentStore.getSelectedDocument()
    };
  },

  render: function() {
    var document = this.state.document;
    var style = {
      width: document.width,
      height: document.height,
      backgroundColor: document.bgcolor
    };

    return (
      <div id="workspace-wrapper">
        <svg id="workspace" style={style}>
          <ModelList />
        </svg>
      </div>
    );
  }
});

module.exports = DocumentPreview;