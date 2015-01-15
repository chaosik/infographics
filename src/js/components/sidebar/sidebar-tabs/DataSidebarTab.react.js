var React = require('react-with-addons');
var FileInput = require('../../utils/FileInput.react');
var DataDialog = require('../../dialog/FileDialog.react.js');
var Dialog = require('../../dialog/utils/DialogBase.react.js');
var DialogButton = require('../../utils/DialogButton.react.js');

var DataSidebarTab = React.createClass({

  statics: {
    title: 'data'
  },

  getDefaultProps: function() {
    return {
      queries: []
    };
  },

  render: function() {
    var queries = this.props.queries.map(function(query) {
      return <div key={query.id}/>;
    });

    return (
      <div>
        <DialogButton dialog={DataDialog}>Open Dialog</DialogButton>
        {queries}
      </div>
    );
  }

});

module.exports = DataSidebarTab;