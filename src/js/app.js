var React = require('react-with-addons');
var Infographics = require('./components/Infographics.react');
var DocumentStore = require('./stores/DocumentStore');

window.onload = function() {
  DocumentStore.fetchDocuments();

  React.render(
    <Infographics />,
    document.body
  );
};