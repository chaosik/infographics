var React = require('react-with-addons');
var ViewMixin = require('../../../../mixins/ViewMixin');
var QueryConstants = require('../../../../constants/QueryConstants');

var QuerySelect = React.createClass({

  getInitialState: function () {
    return {
      selectedIndex: this.props.selectedIndex
    };
  },

  render: function render() {
    var options = QueryConstants.map(function(query, index) {
      return <option value={index} key={index}>{query.queryName}</option>;
    });
    options.unshift(<option value={"-1"} key="-1">Choose a query</option>);

    var queryCriteria = null;
    var CriteriaSelect = null;
    if (this.state.selectedIndex) {
      CriteriaSelect = QueryConstants[this.state.selectedIndex];
      queryCriteria = <CriteriaSelect dataSource={this.props.dataSource} onQueryComplete={this._onQueryComplete}/>;
    }

    return (
      <div>
        <select value={this.state.selectedIndex} onChange={this._onSelect}>
          {options}
        </select>
        {queryCriteria}
      </div>
    );
  },

  _onQueryComplete: function (query) {
    this.props.onSelect(query);
  },

  _onSelect: function onSelect(event) {
    var value = event.currentTarget.value;
    value = value === "-1" ? null : value;
    this.setState({
      selectedIndex: value
    });
  }

});

module.exports = QuerySelect;