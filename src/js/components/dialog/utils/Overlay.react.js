var React = require('react-with-addons');
var ViewMixin = require('../../../mixins/ViewMixin');
var DialogStore = require('../../../stores/DialogStore');

var Overlay = React.createClass({

  mixins: [ViewMixin(DialogStore)],

  getStateFromStore: function getStateFromStore() {
    return {
      visible: DialogStore.getDialogStack().length
    };
  },

  render: function() {
    var className = 'overlay' + (this.state.visible ? ' overlay-visible' : '');

    return (
      <div className={className}></div>
    );
  }
});

module.exports = Overlay;