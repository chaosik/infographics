var React = require('react-with-addons');
var Icon = require('../../utils/Icon.react.js');
var DialogActions = require('../../../actions/DialogActions');


var DialogCloseButton = React.createClass({

  render: function render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <span className="pull-right" onClick={this._closeDialog}>
            <Icon type="close" />
          </span>
        </div>
      </div>
    );
  },

  /**
   * When dialog should be closed
   * @param event
   */
  _closeDialog: function (event) {
    DialogActions.closeDialog();
  }

});

module.exports = DialogCloseButton;