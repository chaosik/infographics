var React = require('react-with-addons');
var QueryConstants = require('../../constants/QueryConstants');
var DataSourceStore = require('../../stores/DataSourceStore');
var TemplateStore = require('../../stores/TemplateStore');
var find = require('lodash').find;



var ModelComponent = React.createClass({
  statics: {
    build: function(element, modelProperties, templateData, dataSetData) {
      try {
        var template = templateData.template.template;
        var templateProperties = templateData.templateProperties;
        var dataSet = dataSetData.query.query(dataSetData.dataSource.data.slice(0, 10), dataSetData.column);

        while (element.lastChild) {
          element.removeChild(element.lastChild);
        }

        template(templateProperties, element, dataSet);
      } catch(e) {
        while (element.lastChild) {
          element.removeChild(element.lastChild);
        }
      }
    },

    getEditorData: function (model) {
      return {
        dataSet: {
          query: find(QueryConstants, {name: model.query}),
          dataSource: DataSourceStore.getSelectedDataSource(),
          column: model.column
        },
        template: {
          template: TemplateStore.findTemplateByName(model.template),
          templateProperties: model.templateProperties
        },
        modelProperties: model.modelProperties
      }
    }
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return !(
      nextProps.query === this.props.query &&
      nextProps.column === this.props.column &&
      nextProps.template === this.props.template &&
      nextProps.templateProperties === this.props.templateProperties
    );
  },

  componentDidMount: function() {
    this._buildModel();
  },

  componentWillUpdate: function() {
    this._buildModel();
  },

  _buildModel: function () {
    var el = this.getDOMNode();
    var modelData = ModelComponent.getEditorData(this.props);
    ModelComponent.build(el, null, modelData.template, modelData.dataSet);
  },

  render: function() {
    return (
      <g />
    );
  }
});

module.exports = ModelComponent;