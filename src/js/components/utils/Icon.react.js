var React = require('react-with-addons');
var IconConstants = require('../../constants/IconConstants');

var Icon = React.createClass({

  getDefaultProps: function() {
    return {
      selector: ''
    };
  },

  render: function() {
    var className = 'glyphicon glyphicon-' + IconConstants[this.props.type] +
      (this.props.selector ? ' ' + this.props.selector : '');

    return (
      <span className={className} />
    );
  }
});

module.exports = Icon;