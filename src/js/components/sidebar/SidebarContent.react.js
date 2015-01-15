var React = require('react-with-addons');
var SidebarTab = require('./SidebarTab');
var FileDialog = require('../dialog/FileDialog.react.js');
var DataSourceDialog = require('../dialog/DataSourceDialog.react');
var DataSetDialog = require('../dialog/DataSetDialog.react');
var DialogButton = require('../utils/DialogButton.react.js');
var ModelDialog = require('../dialog/ModelDialog.react');


var PropertiesSidebarTab = require('./sidebar-tabs/PropertiesSidebarTab.react');
var ModelsSidebarTab = require('./sidebar-tabs/ModelsSidebarTab.react');
var DataSidebarTab = require('./sidebar-tabs/DataSidebarTab.react');
var DocumentSidebarTab = require('./sidebar-tabs/DocumentSidebarTab.react');

var tabs = [DocumentSidebarTab, PropertiesSidebarTab, ModelsSidebarTab, DataSidebarTab];

var SidebarContent = React.createClass({

  render: function() {
    var sidebarTabs = tabs.map(function(Tab, index) {
      return (
        <SidebarTab key={index} title={Tab.title}>
          <Tab />
        </SidebarTab>
      );
    });

    return (
      <div id="sidebar-content">
        <h1>Sidebar Content</h1>
        {sidebarTabs}
        <DialogButton dialog={FileDialog}>Upload Files</DialogButton>
        <DialogButton dialog={DataSourceDialog}>Data sources</DialogButton>
        <DialogButton dialog={DataSetDialog}>Datasets</DialogButton>
        <DialogButton dialog={ModelDialog}>Models</DialogButton>
      </div>
    );
  }
});

module.exports = SidebarContent;