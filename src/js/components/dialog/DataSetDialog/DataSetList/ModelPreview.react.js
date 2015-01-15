var React = require('react-with-addons');
var ViewMixin = require('../../../../mixins/ViewMixin');
var ModelActions = require('../../../../actions/ModelActions');
var isNull = require('lodash').isNull;

var ModelPreview = React.createClass({

  getDefaultProps: function () {
    return {
      query: null,
      dataSource: null,
      template: null
    };
  },

  componentDidUpdate: function() {
    if (['query', 'dataSource', 'template'].some(function(prop) {
        return isNull(this.props[prop]);
      }, this)) {
      return;
    }
    var collection = this.props.query(this.props.dataSource.data.slice(0, 10));
    this.props.template(this.refs.svg.getDOMNode(), collection);
  },

  render: function render() {
    return (
      <div>
        <svg ref="svg" width={400} height={400}><text>model previex</text></svg>
        <button onClick={this._saveModel} className="btn btn-primary">save model</button>
      </div>
    );
  },

  _saveModel: function() {
    if (['query', 'dataSource', 'template'].some(function(prop) {
        return isNull(this.props[prop]);
      }, this)) {
      return;
    }
    ModelActions.saveModel({
      query: this.props.query,
      template: this.props.template,
      dataSource: this.props.dataSource
    });
  }

});

module.exports = ModelPreview;