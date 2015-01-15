var React = require('react-with-addons');
var DialogStore = require('../stores/DialogStore');
var ViewMixin = require('../mixins/ViewMixin');
var Overlay = require('./dialog/utils/Overlay.react.js');
var DialogBase = require('./dialog/utils/DialogBase.react.js');


var DialogStack = React.createClass({

  mixins: [ViewMixin(DialogStore)],

  getStateFromStore: function getState() {
    return {
      dialogStack: DialogStore.getDialogStack()
    };
  },

  render: function() {
    var dialogContent = this.state.dialogStack.map(function(dialogComponent, dialogIndex) {
      var DialogReactComponent = dialogComponent.dialog;
      var props = dialogComponent.props;
      var key = dialogIndex + '_DIALOG';
      var rectangle = props.rectangle;

      return (
        <div key={key}>
          <Overlay />
          <DialogBase rectangle={rectangle} dialogClass={DialogReactComponent.dialogClass}>
            <DialogReactComponent {...props}/>
          </DialogBase>
        </div>);
    });

    return (
      <div id="dialog-stack">
        {dialogContent}
      </div>
    );
  }
});

module.exports = DialogStack;