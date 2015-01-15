var React = require('react-with-addons');
var QueryConstants = require('../../constants/QueryConstants');
var property = require('lodash').property;
var ConstantsSelect = require('./ConstantsSelect.react');

var QuerySelect = React.createClass({

  propTypes: {
    onChange: React.PropTypes.func.isRequired
  },

  render: function() {
    return (
      <ConstantsSelect
        value={this.props.value}
        options={QueryConstants}
        onChange={this.props.onChange}
        getText={property('name')}
        placeholder='select a query' />
    );
  }

});

module.exports = QuerySelect;