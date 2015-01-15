var React = require('react-with-addons');
var TemplatePropertyMixin = require('../../mixins/TemplatePropertyMixin');
var FormGroup = require('../utils/FormGroup.react');

var ColorTemplateProperty = React.createClass({

  statics: {
    databaseKey: 'Mode'
  },

  mixins: [TemplatePropertyMixin],

  render: function render() {
    return (
      <FormGroup label={this.props.label + "(color)"}>
        <select className="form-control" value={this.state.value} onChange={this._onChange}>
          {['horizontal', 'vertical'].map(function(mode) {
            return <option value={mode} key={mode}>{mode}</option>;
          })}
        </select>
      </FormGroup>
    );
  }

});

module.exports = ColorTemplateProperty;