/**
 * Class for storing pair of dialog and its props
 * @see DialogStore
 * @param {Function} dialogReactFunction dialog component created by React.createClass
 * @param {Object} reactComponentProps anything to be added as props to dialog component
 * @constructor
 */
function DialogComponent(dialogReactFunction, reactComponentProps) {
  this.dialog = dialogReactFunction;
  this.props = reactComponentProps;
}

module.exports = DialogComponent;