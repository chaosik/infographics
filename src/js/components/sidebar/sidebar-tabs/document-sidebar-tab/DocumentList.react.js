var React = require('react-with-addons');
var DocumentStore = require('../../../../stores/DocumentStore');
var DocumentActions = require('../../../../actions/DocumentActions');
var ViewMixin = require('../../../../mixins/ViewMixin');
var Icon = require('../../../utils/Icon.react');


var DocumentList = React.createClass({

  mixins: [ViewMixin(DocumentStore)],

  getStateFromStore: function getStateFromStore() {
    return {
      documents: DocumentStore.getDocuments()
    };
  },

  render: function() {
    var documents = this.state.documents.map(function(document, index) {
      return (
        <tr key={index}>
          <td>
            <span className="document-name">{document.name}</span>
          </td>
          <td>
            <button data-index={index} className="btn btn-primary" onClick={this._selectDocument}>Select <Icon type="select"/></button>
          </td>
        </tr>
      );
    }, this);
    var className = (this.props.visible ? '' : ' hidden');

    return (
      <div className={className}>
        <button className="btn btn-primary" onClick={this._backToProperties}>Back to properties <Icon type="back" /></button>
        <table>
          {documents}
        </table>
      </div>
    );
  },

  _selectDocument: function (event) {
    var index = parseInt(event.currentTarget.dataset.index, 10);
    var document = this.state.documents[index];
    DocumentActions.selectDocument(document);
    this.props.onChange();
  },

  _backToProperties: function () {
    this.props.onChange();
  }

});

module.exports = DocumentList;