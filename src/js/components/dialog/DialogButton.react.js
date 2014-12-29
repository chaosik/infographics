var React = require('react-with-addons');
var AppActions = require('../../actions/AppActions');


var DialogButton = React.createClass({

  propTypes: {
    dialog: React.PropTypes.func.isRequired
  },

  render: function() {
    return (
      <button ref="button" className="btn btn-primary" onClick={this._onClick}>{this.props.children}</button>
    );
  },

  _onClick: function() {
    var rectangle = this.refs.button.getDOMNode().getBoundingClientRect();
    var dialog = this.props.dialog;

    AppActions.openDialog(rectangle, dialog);
  }

});

module.exports = DialogButton;