/**
 * @param Store {StoreMixin}
 * @param getState {Function} function for getting state from store
 * @constructor
 */
function ViewMixin(Store, getState) {

  return {
    getInitialState: function() {
      return getState();
    },

    componentDidMount: function() {
      Store.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
      Store.removeChangeListener(this._onChange);
    },

    _onChange: function() {
      this.setState(getState());
    }
  };
}


module.exports = ViewMixin;