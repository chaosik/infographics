var React = require('react-with-addons');
var SidebarTab = require('./SidebarTab');
var SidebarTabConstants = require('../../constants/SidebarTabsConstants');
var mapKeyValues = require('../../utils/mapKeyValues');

var SidebarContent = React.createClass({

  componentWillMount: function() {
    this.tabs = mapKeyValues(SidebarTabConstants);
  },

  render: function() {
    var sidebarTabs = this.tabs.map(function(tab) {
      return (
        <SidebarTab key={tab.key} title={tab.value.title}>
          <tab.value />
        </SidebarTab>
      );
    });

    return (
      <div id="sidebar-content">
        <h1>Sidebar Content</h1>
        {sidebarTabs}
      </div>
    );
  }
});

module.exports = SidebarContent;