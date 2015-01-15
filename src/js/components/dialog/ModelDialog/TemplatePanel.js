var React = require('react-with-addons');
var ViewMixin = require('../../../mixins/ViewMixin');
var FormGroup = require('../../utils/FormGroup.react');
var TemplateSelect = require('../../select/TemplateSelect.react');
var TemplateProperties = require('./TemplatePanel/TemplateProperties.react');



var TemplatePanel = React.createClass({

  getInitialState: function() {
    return this.props.template || {
      template: null,
      templateProperties: null
    };
  },

  render: function render() {
    return (
      <div className="form-horizontal">
        <FormGroup label="template">
          <TemplateSelect value={this.state.template} onChange={this._setTemplate} dataSetType={this.props.dataSetType}/>
        </FormGroup>
        <TemplateProperties template={this.state.template} onChange={this._setTemplateProperties}/>
      </div>
    );
  },

  _setTemplate: function (template) {
    var templateProperties = template ? template.defaultProperties : null;
    this.setState({
      template: template,
      templateProperties: templateProperties
    });
    this._isPanelReady({
      template: template,
      templateProperties: templateProperties
    });
  },

  _setTemplateProperties: function (templateProperties) {
    this.setState({
      templateProperties: templateProperties
    });
    this._isPanelReady({
      template: this.state.template,
      templateProperties: templateProperties
    });
  },

  _isPanelReady: function isPanelReady(panelProperties) {
    var template = panelProperties.template;
    var templateProperties = panelProperties.templateProperties;
    //this.props.onChange(template ? template.template.bind({}, templateProperties) : null);
    this.props.onChange(template ? panelProperties : null);
  }
});

module.exports = TemplatePanel;