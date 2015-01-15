var React = require('react-with-addons');
var TemplatePropertyMixin = require('../../mixins/TemplatePropertyMixin');
var FormGroup = require('../utils/FormGroup.react');
var ShapeStore = require('../../stores/ShapeStore');

var ColorTemplateProperty = React.createClass({

  statics: {
    databaseKey: 'Shape'
  },

  mixins: [TemplatePropertyMixin],

  getInitialState: function() {
    return {
      options: []
    };
  },

  componentDidMount: function () {
    var that = this;
    ShapeStore.getShapes().then(function (shapes) {
      if (that.isMounted()) {
        that.setState({
          options: shapes
        });
      }
    });
  },

  render: function render() {
    return (
      <FormGroup label={this.props.label + "(shape)"}>
        <select className="form-control" value={this.state.value} onChange={this._onChange}>
          {this.state.options.map(function(item) {
            var shape = item.name;
            return <option value={shape} key={shape}>{shape}</option>;
          })}
        </select>
      </FormGroup>
    );
  }

});

module.exports = ColorTemplateProperty;