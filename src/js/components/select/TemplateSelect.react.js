var React = require('react-with-addons');
var property = require('lodash').property;
var TemplateStore = require('../../stores/TemplateStore');
var ConstantsSelect = require('./ConstantsSelect.react');



var TemplateSelect = React.createClass({

  propTypes: {
    onChange: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      options: [],
      value: this.props.value
    };
  },

  componentDidMount: function () {
    var that = this;
    TemplateStore.getTemplates().then(function (templates) {
      if (that.isMounted()) {
        that.setState({
          options: templates
        });
      }
    });
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.dataSetType !== this.props.dataSetType) {
      this.setState({
        value: -1
      });
      this.props.onChange(null);
    }
  },

  render: function() {
    if (this.props.dataSetType) {
      var options = this.state.options.filter(function(option) {
        return option.dataSetType === this.props.dataSetType;
      }, this);
      return (
        <ConstantsSelect
          value={this.state.value}
          options={options}
          onChange={this._onChange}
          getText={property('name')}
          placeholder='select a template' />
      );
    } else {
      return (
        <select disabled="disabled"><option>Select a dataSet query First</option></select>
      );
    }
  },

  _onChange: function (template) {
    this.props.onChange(template);
  }

});

module.exports = TemplateSelect;