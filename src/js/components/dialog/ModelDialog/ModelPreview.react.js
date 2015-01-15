var React = require('react-with-addons');
var isNull = require('lodash').isNull;
var ModelComponent = require('../../model/ModelComponent.react');


var ModelPreview = React.createClass({

  getDefaultProps: function () {
    return {
      modelProperties: null,
      dataSet: null,
      template: null
    };
  },

  componentDidUpdate: function() {
    //if (['modelProperties', 'dataSet', 'template'].some(function(prop) {
    //    return isNull(this.props[prop]);
    //  }, this)) {
    //  return;
    //}
    //var el = this.getDOMNode();
    //ModelComponent.build(el, this.props.modelProperties, this.props.template, this.props.dataSet);
    try {
      var el = this.getDOMNode();
      ModelComponent.build(el, this.props.modelProperties, this.props.template, this.props.dataSet);
    } finally {}
  },

  componentDidMount: function () {
    try {
      var el = this.getDOMNode();
      ModelComponent.build(el, this.props.modelProperties, this.props.template, this.props.dataSet);
    } finally {}
  },

  render: function render() {
    return (
      <svg width={100} height={100}>
        <text>model previex</text>
      </svg>
    );
  }

});

module.exports = ModelPreview;