var React = require('react-with-addons');
var ModelStore = require('../../../stores/ModelStore');
var ViewMixin = require('../../../mixins/ViewMixin');
var ModelActions = require('../../../actions/ModelActions');
var Icon = require('../../utils/Icon.react');
var ModelDialog = require('../../dialog/ModelDialog.react');
var DialogButton = require('../../utils/DialogButton.react');



var ModelsSidebarTab = React.createClass({

  statics: {
    title: 'models'
  },

  mixins: [ViewMixin(ModelStore)],

  getStateFromStore: function () {
    return {
      models: ModelStore.getModels()
    }
  },

  render: function() {
    var models = this.state.models.map(function(model, index) {
      return (
        <tr key={index} onClick={this._selectModel}>
          <td>{model.name}</td>
          <td>
            <DialogButton dialog={ModelDialog} modelIndex={index}><Icon type="model"/></DialogButton>
            <button className="btn btn-primary" data-index={index} onClick={this._modelZUp}><Icon type="z-up"/></button>
            <button className="btn btn-primary" data-index={index} onClick={this._modelZDown}><Icon type="z-down"/></button>
          </td>
        </tr>
      )
    }, this);

    return (
      <div>
        <button className="btn btn-primary" onClick={this._newModel}>New model</button>
        <table>
          {models}
        </table>
      </div>
    );
  },

  _modelZUp: function (event) {
    event.preventDefault();
    var index = parseInt(event.currentTarget.dataset.index, 10);
    ModelActions.moveZUp(index);
  },

  _modelZDown: function (event) {
    event.preventDefault();
    var index = parseInt(event.currentTarget.dataset.index, 10);
    ModelActions.moveZDown(index);
  },

  _selectModel: function (event) {
    if (event.isDefaultPrevented()) {
      return;
    }
    event.preventDefault();
    var index = parseInt(event.currentTarget.dataset.index, 10);
    ModelActions.select(index);
  }

});

module.exports = ModelsSidebarTab;