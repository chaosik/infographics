var React = require('react-with-addons');
var ModelPreview = require('./DataSetList/ModelPreview.react');
var DataSourceSelect = require('./DataSetList/DataSourceSelect.react');
var QuerySelect = require('./DataSetList/QuerySelect.react.js');
var TemplateSelect = require('./DataSetList/TemplateSelect.react');

var DataSetEditor = React.createClass({

  propTypes: {
    onReturn: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      dataSource: this.props.dataSource,
      template: this.props.template,
      query: this.props.query
    };
  },

  render: function render() {
    var dataSource = this.state.dataSource;
    var query = this.state.query;
    var template = this.state.template;

    return (
      <div className="pull-left">
        Data Sources:
        <button onClick={this._returnToList}>Return to list</button>
        <ModelPreview dataSource={dataSource} query={query} template={template}/>
        <div className="row">
          <div className="col-md-6 model-select">
            <DataSourceSelect dataSource={dataSource} onSelect={this._dataSourceSelect}/>
            <QuerySelect query={query} dataSource={dataSource} onSelect={this._querySelect}/>
          </div>
          <div className="col-md-6 model-select">
            <TemplateSelect template={template} onSelect={this._templateSelect}/>
          </div>
        </div>
      </div>
    );
  },

  _dataSourceSelect: function(dataSource) {
    this.setState({
      dataSource: dataSource
    });
  },

  _querySelect: function(query) {
    this.setState({
      query: query
    });
  },

  _templateSelect: function (template) {
    this.setState({
      template: template
    });
  },

  _returnToPreview: function returnToPreview(event) {
    this.props.onReturn();
  }

});

module.exports = DataSetEditor;