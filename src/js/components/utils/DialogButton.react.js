var React = require('react-with-addons');
var DialogActions = require('../../actions/DialogActions');
var omit = require('lodash').omit;

var DialogButton = React.createClass({

  propTypes: {
    dialog: React.PropTypes.func.isRequired
  },

  render: function() {
    return (
      <button ref="button" className="btn btn-primary" onClick={this._onClick}>{this.props.children}</button>
    );
  },

  _onClick: function(event) {
    event.preventDefault();
    var dialog = this.props.dialog;
    var props = omit(this.props, ['dialog', 'children']);
    props.rectangle = this.refs.button.getDOMNode().getBoundingClientRect();

    DialogActions.openDialog(dialog, props);
  }
});

module.exports = DialogButton;