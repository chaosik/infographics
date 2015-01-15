var React = require('react-with-addons');
var d3 = require('d3');
var ViewMixin = require('../../../mixins/ViewMixin');

var DataSourcePreview = React.createClass({

  propTypes: {
    dataSource: React.PropTypes.object.isRequired,
    onReturn: React.PropTypes.func.isRequired
  },

  componentDidMount: function () {
    var data = this.props.dataSource.data;
    var tableWrapperNode = this.refs.tableWrapper.getDOMNode();
    var theadNode = this.refs.thead.getDOMNode();
    var tbodyNode = this.refs.tbody.getDOMNode();
    var columns = Object.keys(data[0]);

    d3.select(theadNode).append('tr')
      .selectAll('th')
        .data(columns)
      .enter().append('th')
        .text(function(column) { return column; });

    var rows = d3.select(tbodyNode).selectAll('tr')
        .data(data.slice(0, 100))
      .enter().append('tr');

    var cells = rows.selectAll('td')
        .data(function(row) {
          return columns.map(function(column) {
            return { column: column, value: row[column] };
          });
        })
      .enter().append('td')
        .text(function(cell) { return cell.value; });

    var tableRectangle = tableWrapperNode.getBoundingClientRect();
    var dialogRectangle = tableWrapperNode.offsetParent.getBoundingClientRect();

    var tableHeight = (dialogRectangle.height + dialogRectangle.top - tableRectangle.top);
    tableWrapperNode.setAttribute('style', 'height:' + tableHeight + 'px');
  },

  render: function render() {
    return (
      <div>
        Data Sources:
        <button onClick={this._returnToPreview} className="btn btn-primary">return to preview</button>
        <div className="data-source-preview" ref="tableWrapper">
          <table className="table">
            <thead ref="thead">{/*header*/}</thead>
            <tbody ref="tbody">{/*rows*/}</tbody>
          </table>
        </div>
      </div>
    );
  },

  _returnToPreview: function returnToPreview(event) {
    this.props.onReturn();
  }

});

module.exports = DataSourcePreview;