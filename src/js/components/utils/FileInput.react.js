var React = require('react-with-addons');

if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
  console.log('No file API, what to do?');
}

var FileInput = React.createClass({
  render: function() {
    return <input type="file" />;
  }
});

module.exports = FileInput;