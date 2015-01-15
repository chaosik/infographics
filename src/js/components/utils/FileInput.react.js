var React = require('react-with-addons');

if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
  console.log('No file API, what to do?');
}

var FileInput = React.createClass({

  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    multiple: React.PropTypes.bool
  },

  render: function() {
    return <input type="file" multiple={this.props.multiple ? true : false} onChange={this._onChange}/>;
  },

  /**
   * @param {SyntheticEvent} event
   */
  _onChange: function _onChange(event) {
    var files = Array.prototype.slice.call(event.target.files);
    this.props.onChange(files);
  }

});

module.exports = FileInput;