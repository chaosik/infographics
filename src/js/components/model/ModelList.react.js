var React = require('react-with-addons');
var GroupModel = require('./GroupModel.react.js');
var ModelStore = require('../../stores/ModelStore');
var ViewMixin = require('../../mixins/ViewMixin');


function reverse(array) {
  var result = array.slice();
  var length = result.length;
  var left = null;
  var right = null;
  var temporary;

  for (left = 0; left < length / 2; left += 1)  {
    right = length - 1 - left;
    temporary = result[left];
    result[left] = result[right];
    result[right] = temporary;
  }
  return result;
}

var ModelList = React.createClass({

  mixins: [ViewMixin(ModelStore)],

  getStateFromStore: function getStateFromStore() {
    return {
      models: ModelStore.getModels()
    };
  },

  render: function() {
    var models = this.state.models.map(function(model, index) {
      return (
        <GroupModel
          key={model.key}
          index={index}
          modelProperties={model.modelProperties}
          query={model.query}
          column={model.column}
          template={model.template}
          templateProperties={model.templateProperties} />
      );
    });
    return (
      <g>
        {reverse(models)}
      </g>
    );
  }
});

module.exports = ModelList;