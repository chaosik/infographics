var React = require('react-with-addons');
var AppStore = require('../../stores/AppStore');
var ViewMixin = require('../../mixins/ViewMixin');
var AppActions = require('../../actions/AppActions');

var timeout;

var Dialog = React.createClass({

  mixins: [new ViewMixin(AppStore, function getState() {
    return {
      rectangle: AppStore.getDialogRectangle(),
      visibility: AppStore.getDialogVisibility(),
      dialogStack: AppStore.getDialogStack()
    };
  })],

  render: function() {
    var rectangle = this.state.rectangle;
    var style = rectangle ? {
      left: rectangle.left,
      top: rectangle.top,
      width: rectangle.width,
      height: rectangle.height,
      transform: 'initial'
    } : {};

    var noTransition = rectangle ? 'no-transition' : '';

    if (!timeout) {
      timeout = setTimeout(function clearDialogRectangleTimeout() {
        AppActions.clearDialogRectangle();
        timeout = null;
      });
    }

    var dialogContent = this.state.dialogStack.map(function(DialogComponent) {
      return <DialogComponent key={DialogComponent.displayName} />;
    });

    return (
      <div id="dialog" className={noTransition} style={style} onClick={this._closeDialog}>
        <div>
          dialog content
        </div>
        {dialogContent}
      </div>
    );
  },

  _closeDialog: function () {
    AppActions.hideDialog();
  }

});

module.exports = Dialog;