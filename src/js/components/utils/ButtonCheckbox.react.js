var React = require('react-with-addons');

var ButtonCheckbox = React.createClass({
  propTypes: {
    isChecked: React.PropTypes.func,
    onClick: React.PropTypes.func
  },

  render: function() {
    var className = "btn btn-primary" +
      (this.isChecked(this.props.checked) ? " active" : "");

    return (
      <button className={className} onClick={this.props.onClick}>{this.props.children}</button>
    );
  },

  /**
   * Checks if button should be in active state
   * if isChecked is provided in props then its
   * used to determine checked basing on this.props.checked
   * if not, just convert this.props.checked to boolean
   * @param value
   * @returns {boolean}
   */
  isChecked: function(value) {
    if (this.props.hasOwnProperty('isChecked')) {
      return this.props.isChecked(value);
    } else {
      return Boolean(value);
    }
  }

});

module.exports = ButtonCheckbox;