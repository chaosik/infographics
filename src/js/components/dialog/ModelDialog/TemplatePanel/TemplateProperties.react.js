var React = require('react-with-addons');
var BooleanTemplateProperty = require('../../../templateProperties/BooleanTemplateProperty.react');
var ColorTemplateProperty = require('../../../templateProperties/ColorTemplateProperty.react');
var ModeTemplateProperty = require('../../../templateProperties/ModeTemplateProperty.react');
var NumberTemplateProperty = require('../../../templateProperties/NumberTemplateProperty.react');
var ShapeTemplateProperty = require('../../../templateProperties/ShapeTemplateProperty.react');
var clone = require('lodash').clone;

var templatePropertyComponents = {};
[
  BooleanTemplateProperty,
  ColorTemplateProperty,
  ModeTemplateProperty,
  NumberTemplateProperty,
  ShapeTemplateProperty
].map(function(templateProperty) {
  templatePropertyComponents[templateProperty.databaseKey] = templateProperty;
});

var TemplateProperties = React.createClass({

  getInitialState: function() {
    return this.props.template ? this.props.template.defaultProperties : null;
  },

  componentWillRecieveProps: function() {
    this.setState(this.props.template ? this.props.template.defaultProperties : null);
  },

  render: function () {
    if (!this.props.template) {
      return <div />;
    }
    var properties = this.props.template.properties;
    var that = this;
    var templateProperties = properties.map(function(templateProperty, index) {
      var TemplatePropertyComponent = templatePropertyComponents[templateProperty.type];
      return (
        <TemplatePropertyComponent
          key={index}
          defaultValue={templateProperty.defaultValue}
          label={templateProperty.name}
          onChange={function(value) {
            var state = {};
            state[templateProperty.name] = value;
            that.setState(state);

            var change = clone(that.state || {});
            change[templateProperty.name] = value;
            that.props.onChange(change);
          }} />
      );
    });

    return (
      <div>
        {templateProperties}
      </div>
    );
  }
});

module.exports = TemplateProperties;