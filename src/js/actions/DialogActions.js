var AppDispatcher = require('../dispatcher/AppDispatcher');
var DialogConstants = require('../constants/DialogConstants');

var DialogActions = {

  openDialog: function(dialog, props) {
    AppDispatcher.handleViewAction({
      actionType: DialogConstants.OPEN,
      dialog: dialog,
      props: props
    });
  },

  closeDialog: function() {
    AppDispatcher.handleViewAction({
      actionType: DialogConstants.CLOSE
    });
  }

};

module.exports = DialogActions;