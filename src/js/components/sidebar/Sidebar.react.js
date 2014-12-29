var React = require('react-with-addons');
var SidebarContent = require('./SidebarContent.react.js');
var AppStore = require('../../stores/AppStore');
var AppActions = require('../../actions/AppActions');
var ViewMixin = require('../../mixins/ViewMixin');

var Sidebar = React.createClass({

  mixins: [new ViewMixin(AppStore, function getState() {
    return {
      visible: AppStore.getSidebarVisibility()
    };
  })],

  render: function() {
    return (
      <div id="sidebar">
        <button id="sidebar-toggle" onClick={this._toggleSidebar}>Toogle Sidebar</button>
        <SidebarContent />
      </div>
    );
  },

  _toggleSidebar: function() {
    AppActions.changeSidebarVisibility(!this.state.visible);
  }
});

module.exports = Sidebar;