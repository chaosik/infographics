var React = require('react-with-addons');
var AppStore = require('../stores/AppStore');
var Workspace = require('./Workspace.react');
var Sidebar = require('./sidebar/Sidebar.react.js');
var Dialog = require('./dialog/Dialog.react.js');
var Overlay = require('./dialog/Overlay.react.js');
var ViewMixin = require('../mixins/ViewMixin');

var classSet = React.addons.classSet;

var Infographics = React.createClass({

  mixins: [new ViewMixin(AppStore, function getState() {
    return {
      sidebarVisible: AppStore.getSidebarVisibility(),
      dialogVisible: AppStore.getDialogVisibility()
    };
  })],

  render: function() {
    var className = classSet({
      'sidebar-visible': this.state.sidebarVisible,
      'dialog-visible': this.state.dialogVisible
    });

    return (
      <div className={className}>
        <Workspace />
        <Sidebar />
        <Dialog />
        <Overlay />
      </div>
    );
  }

});

module.exports = Infographics;