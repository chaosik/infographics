var AppDispatcher = require('../dispatcher/AppDispatcher');
var StoreMixin = require('../mixins/StoreMixin');
var UrlConstants = require('../constants/UrlConstants');
var DocumentConstants = require('../constants/DocumentConstants');
var ModelActions = require('../actions/ModelActions');
var ModelStore = require('./ModelStore');
var Promise = require('es6-promise').Promise;
var qwest = require('qwest');
var _ = require('lodash');
var merge = _.merge;

var _documents = [];
var _selectedDocument;

function updateSelectedDocument (documentData) {
  merge(_selectedDocument, documentData);
}

function selectDocument(document) {
  _selectedDocument = document;
  if (document.hasOwnProperty('documentId')) {
    ModelActions.fetchModelsFor(document.documentId);
  }
}

/**
 * Store for various application data
 * @mixes StoreMixin
 */
var DocumentStore = merge({}, StoreMixin, {

  getDocuments: function getDocuments() {
    return _documents;
  },

  getSelectedDocument: function() {
    return _selectedDocument;
  },

  fetchDocuments: function() {
    // download documents
    qwest.get(UrlConstants.documents)
      .then(function(result) {
        _documents = _documents.concat(result.Documents.map(function(document) {
          return {
            name: document.Name,
            bgcolor: document.Bgcolor,
            height: document.Height,
            width: document.Width,
            documentId: document.DocumentId
          };
        }));
        DocumentStore.emitChange();
      })
      .catch(function() {
        console.warn('can\'t fetch documents');
      });
  },

  dispatcherIndex: AppDispatcher.register(function dispatcher(payload) {
    var action = payload.action;

    switch(action.actionType) {

      case DocumentConstants.UPDATE:
        updateSelectedDocument(action.document);
        break;

      case DocumentConstants.SELECT:
        selectDocument(action.document);
        break;

      default:
        return true;
    }
    DocumentStore.emitChange();
    return true;
  })

});

// create mock document at the start of page:
var mockDocument = {
  name: 'Your Document',
  width: 500,
  height: 500,
  bgcolor: '#FF8C00'
};
_documents.push(mockDocument);
_selectedDocument = _documents[0];

module.exports = DocumentStore;