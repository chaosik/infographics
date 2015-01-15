/**
 * @param Store {StoreMixin}
 * @constructor
 */
function ViewMixin(Store) {

  return {
    getInitialState: function getInitialState() {
      return this.getStateFromStore();
    },

    componentDidMount: function componentDidMount() {
      Store.addChangeListener(this._onStoreChange);
    },

    componentWillUnmount: function componentWillUnmount() {
      Store.removeChangeListener(this._onStoreChange);
    },

    _onStoreChange: function _onStoreChange() {
      this.setState(this.getStateFromStore());
    }
  };
}

module.exports = ViewMixin;