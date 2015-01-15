var React = require('react-with-addons');
var DocumentStore = require('../../../stores/DocumentStore');
var GroupModelActions = require('../../../actions/GroupModelActions');
var GroupModelProperties = require('../../../constants/GroupModelPropertiesConstants');
var PropertyInput = require('../utils/PropertyInput.react.js');
var FocusedMode = require('../utils/FocusedMode.react');
var mapKeyValues = require('../../../utils/mapKeyValues');
var ViewMixin = require('../../../mixins/ViewMixin');

var DocumentList = require('./document-sidebar-tab/DocumentList.react');
var DocumentProperties = require('./document-sidebar-tab/DocumentProperties.react');

var DocumentSidebarTab = React.createClass({

  statics: {
    title: 'document'
  },

  mixins: [ViewMixin(DocumentStore)],

  getStateFromStore: function getStateFromStore() {
    return {
      documents: DocumentStore.getDocuments()
    };
  },

  getInitialState: function() {
    return {
      list: false
    };
  },

  render: function() {
    return (
      <div>
        <DocumentProperties visible={!this.state.list} onChange={this._setList}/>
        <DocumentList visible={this.state.list} onChange={this._setProperties}/>
      </div>
    );
  },

  _setList: function () {
    this.setState({
      list: true
    });
  },

  _setProperties: function () {
    this.setState({
      list: false
    });
  },

  /**
   * When input value was changed by user
   * @fires ModelStore#updateGroup
   * @param property
   * @param value
   * @private
   */
  _onPropertyChange: function (property, value) {
    GroupModelActions.update(this.state.model.id, value);
  }

});

module.exports = DocumentSidebarTab;