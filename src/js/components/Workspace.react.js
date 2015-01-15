var React = require('react-with-addons');
var GroupModel = require('./model/GroupModel.react.js');
var ModelStore = require('../stores/ModelStore');
var ViewMixin = require('../mixins/ViewMixin');

var Workspace = React.createClass({

  mixins: [ViewMixin(ModelStore)],

  getStateFromStore: function getStateFromStore() {
    return {
      allModels: ModelStore.getAll()
    };
  },

  render: function() {
    var allModels = this.state.allModels;
    var groupModels = [];
    for (var key in allModels) {
      var model = allModels[key];
      var group = model.group;
      groupModels.push(
        <GroupModel
          key={model.id}
          groupId={model.id}
          model={model.model}
          modelData={model.modelData}
          x={group.x}
          y={group.y}
          rotation={group.rotation}
          scale={group.scale}
          focus={group.focus}/>
      );
    }

    return (
      <div id="workspace-wrapper">
        <svg id="workspace">
          {groupModels}
        </svg>
      </div>
    );
  }
});

module.exports = Workspace;