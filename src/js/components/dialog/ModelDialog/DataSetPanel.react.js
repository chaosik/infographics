var React = require('react-with-addons');
var ViewMixin = require('../../../mixins/ViewMixin');
var DataSourceStore = require('../../../stores/DataSourceStore');
var FormGroup = require('../../utils/FormGroup.react');
var DataSourceSelect = require('../../select/DataSourceSelect.react');
var QuerySelect = require('../../select/QuerySelect.react');
var ColumnSelect = require('../../select/ColumnSelect.react');

var DataSetPanel = React.createClass({

  propTypes: {
    onChange: React.PropTypes.func.isRequired
  },

  mixins: [ViewMixin(DataSourceStore)],

  getStateFromStore: function () {
    var dataSource = DataSourceStore.getSelectedDataSource();
    if (this.isMounted()) {
      this._isPanelReady({
        column: this.state.column || null,
        query: this.state.query || null,
        dataSource: dataSource
      });
    }
    return {
      dataSource: dataSource
    };
  },

  getInitialState: function() {
    if (this.props.dataSet) {
      return {
        query: this.props.dataSet.query,
        column: this.props.dataSet.column
      }
    } else {
      return {
        query: null,
        column: null
      };
    }
  },

  render: function render() {
    return (
      <div className="form-horizontal">
        <FormGroup label="data source">
          <DataSourceSelect />
        </FormGroup>
        <FormGroup label="query">
          <QuerySelect value={this.state.query} onChange={this._setQuery}/>
        </FormGroup>
        <FormGroup label="column">
          <ColumnSelect value={this.state.column} onChange={this._setColumn}/>
        </FormGroup>
      </div>
    );
  },

  _setQuery: function setQuery(query) {
    this.setState({
      query: query
    });
    this._isPanelReady({
      column: this.state.column,
      query: query,
      dataSource: this.state.dataSource
    });
  },

  _setColumn: function setColumn(column) {
    this.setState({
      column: column
    });
    this._isPanelReady({
      column: column,
      query: this.state.query,
      dataSource: this.state.dataSource
    });
  },

  _isPanelReady: function(panelProperties) {
    var dataSource = panelProperties.dataSource;
    var query = panelProperties.query;
    var column = panelProperties.column;
    //var dataSet = dataSource && query && column ? query.query(dataSource.data.slice(0, 10), column) : null;
    //this.props.onChange(dataSet);
    this.props.onChange(dataSource && query && column ? panelProperties : null);
  }

});

module.exports = DataSetPanel;