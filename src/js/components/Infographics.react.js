var React = require('react-with-addons');
var AppStore = require('../stores/AppStore');
var Workspace = require('./Workspace.react');
var Sidebar = require('./sidebar/Sidebar.react.js');
var DialogStack = require('./DialogStack.react.js');
var ViewMixin = require('../mixins/ViewMixin');
var DocumentPreview = require('./DocumentPreview.react');

var classSet = React.addons.classSet;

var Infographics = React.createClass({

  mixins: [ViewMixin(AppStore)],

  getStateFromStore: function getStateFromStore() {
    return {
      sidebarVisible: AppStore.getSidebarVisibility()
    };
  },

  render: function() {
    var className = classSet({
      'sidebar-visible': this.state.sidebarVisible
    });

    return (
      <div className={className}>
        <DocumentPreview />
        <Sidebar />
        <DialogStack />
      </div>
    );
  }
});

module.exports = Infographics;