var React = require('react-with-addons');




var ConstantsSelect = React.createClass({

  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    //value: React.PropTypes.object,
    getText: React.PropTypes.func,
    options: React.PropTypes.array.isRequired,
    placeholder: React.PropTypes.string
  },

  readValue: function readValue(value, options) {
    if (options === undefined) {
      options = this.props.options;
    }
    if (typeof value === 'number') {
      return value;
    } else {
      return options.indexOf(value);
    }
  },

  getInitialState: function () {
    return {
      value: this.readValue(this.props.value)
    };
  },

  componentWillReceiveProps: function(newProps) {
    if (this.props.options !== newProps.options) {
      this.setState({
        value:  this.readValue(newProps.value, newProps.options)
      });
    }
  },

  render: function render() {
    var options = [<option value={-1} key="-1">{this.props.placeholder || ''}</option>].concat(
      this.props.options.map(function (item, index) {
        return <option value={index} key={index}>{this._getText(item, index)}</option>;
      }, this)
    );

    return (
      <select className="form-control" value={this.state.value} onChange={this._onChange}>
          {options}
      </select>
    );
  },

  _onChange: function onChange(event) {
    var index = parseInt(event.target.value, 10);
    this.setState({
      value: index
    });
    var item = index !== -1 ? this.props.options[index] : null;
    this.props.onChange(item, index);
  },

  _getText: function(item) {
    return this.props.getText ? this.props.getText(item) : item;
  }

});

module.exports = ConstantsSelect;