var React = require('react-with-addons');
var FileInput = require('../../utils/FileInput.react');
var DataDialog = require('../../dialog/DataDialog.react');
var DialogButton = require('../../dialog/DialogButton.react');


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
        <FileInput/>
        {queries}
      </div>
    );
  }

});

module.exports = DataSidebarTab;