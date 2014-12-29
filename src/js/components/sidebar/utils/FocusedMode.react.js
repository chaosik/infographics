var React = require('react-with-addons');
var ButtonCheckbox = require('../../utils/ButtonCheckbox.react');
var FocusedModeConstants = require('../../../constants/FocusedModeConstants');
var AppStore = require('../../../stores/AppStore');
var AppActions = require('../../../actions/AppActions');
var ViewMixin = require('../../../mixins/ViewMixin');

var map = require('lodash').map;

/**
 * Array consisting of object with 'key' and 'label' keys
 * @type {Array<{key: {string}, value: {string}}>}
 */
var _modes = map(FocusedModeConstants, function(value, key) {
  return {
    key: key,
    value: value
  };
});


var FocusedMode = React.createClass({

  mixins: [new ViewMixin(AppStore, function getState() {
    return {
      focusedMode: AppStore.getFocusedMode()
    };
  })],

  render: function() {
    var buttons = _modes.map(function(mode) {
      return <ButtonCheckbox
        key={mode.key}
        onClick={this._onChangeMode.bind(this, mode.value)}
        checked={this.state.focusedMode === mode.value}
      >{mode.value}</ButtonCheckbox>;
    }, this);

    return (
      <div className="btn-group">
        {buttons}
      </div>
    );
  },

  /**
   * Method for chaining focused mode
   * call AppAction with mode.key
   * @fires AppStore#setFocusedMode
   * @param mode {string}
   * @private
   */
  _onChangeMode: function(mode) {
    AppActions.changeFocusedMode(mode);
  }

});

module.exports = FocusedMode;