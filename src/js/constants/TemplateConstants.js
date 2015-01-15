var barChart = require('../templates/barChart');
var pieChart = require('../templates/pieChart');
var counter = require('../templates/counter');

/**
 * Array of functions transforming dataSources to dataSets
 * @type {{name: String, template: Function}[]}
 */
var TemplateConstants = [
  { name: 'bar chart', template: barChart },
  { name: 'pie chart', template: pieChart },
  { name: 'counter', template: counter }
];

module.exports = TemplateConstants;