var mapValues = require('lodash').mapValues;

var baseUrl = '../../infographics-php/index.php';

var UrlConstants = mapValues({
  templates: '/templates',
  shapes: '/shapes',
  documents: '/documents',
  models: '/models'
}, function(url) {
  return baseUrl + url;
});

module.exports = UrlConstants;
