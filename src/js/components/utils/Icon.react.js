var React = require('react-with-addons');
var IconConstants = require('../../constants/IconConstants');

var Icon = React.createClass({

  getDefaultProps: function() {
    return {
      selector: ''
    };
  },

  render: function() {
    if (!IconConstants[this.props.type]) {
      console.warn('IconConstant "' + this.props.type + '" isn\'t defined.')
    }
    var className = 'glyphicon glyphicon-' + IconConstants[this.props.type] +
      (this.props.selector ? ' ' + this.props.selector : '');

    return (
      <span className={className} />
    );
  }
});

module.exports = Icon;