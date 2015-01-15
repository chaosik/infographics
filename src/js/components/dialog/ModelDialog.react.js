var React = require('react-with-addons');
var DialogCloseButton = require('./utils/DialogCloseButton.react.js');
var ModelStore = require('../../stores/ModelStore');
var ModelPreview = require('./ModelDialog/ModelPreview.react');
var TemplatePanel = require('./ModelDialog/TemplatePanel');
var ModelPanel = require('./ModelDialog/ModelPanel.react');
var DataSetPanel = require('./ModelDialog/DataSetPanel.react');
var ModelComponent = require('../model/ModelComponent.react');

var ModelDialog = React.createClass({

  statics: {
    dialogClass: 'big-dialog'
  },

  getInitialState: function() {
    if (this.props.modelIndex === undefined) {
      return {
        dataSet: null,
        modelProperties: {
          x: 0,
          y: 0,
          sx: 1,
          sy: 1,
          r: 0,
          z: 0
        },
        template: null,
        dataSetType: null
      };
    } else {
      var model = ModelStore.getModel(this.props.modelIndex);
      var state = ModelComponent.getEditorData(model);
      if (state.dataSet && state.dataSet.query) {
        state.dataSetType = state.dataSet.query.type;
      }
      return state;
    }
  },

  render: function render() {
    return (
      <div>
        <DialogCloseButton/>
        <div className="row">
          <div className="col-sm-8">
            <ModelPreview
              modelProperties={this.state.modelProperties}
              template={this.state.template}
              dataSet={this.state.dataSet}/>
          </div>
          <div className="col-sm-4">
            <ModelPanel modelProperties={this.state.modelProperties} onChange={this._setModelProperties}/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <DataSetPanel onChange={this._setDataSet} dataSet={this.state.dataSet}/>
          </div>
          <div className="col-sm-6">
            <TemplatePanel dataSetType={this.state.dataSetType} template={this.state.template} onChange={this._setTemplate}/>
          </div>
        </div>
      </div>
    );
  },

  _setModelProperties: function (modelProperties) {
    this.setState({
      modelProperties: modelProperties
    });
  },

  _setDataSet: function (dataSet) {
    this.setState({
      dataSet: dataSet,
      dataSetType: dataSet && dataSet.query ? dataSet.query.dataSetType : null
    });
  },

  _setTemplate: function (template) {
    this.setState({
      template: template
    });
  }

});

module.exports = ModelDialog;