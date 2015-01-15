var React = require('react-with-addons');

var FormGroup = React.createClass({

  propTypes: {
    label: React.PropTypes.string.isRequired,
    children: React.PropTypes.element.isRequired
  },

  render: function render() {
    return (
      <div className="form-group">
        <label className="col-sm-4 control-label">{this.props.label + ':'}</label>
        <div className="col-sm-8">
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = FormGroup;