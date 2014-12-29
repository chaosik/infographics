var React = require('react-with-addons');
var Infographics = require('./components/Infographics.react');

window.onload = function() {
  React.render(
    <Infographics />,
    document.body
  );
};