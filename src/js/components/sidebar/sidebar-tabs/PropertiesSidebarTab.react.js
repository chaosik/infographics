var React = require('react-with-addons');
var ModelStore = require('../../../stores/ModelStore');
var GroupModelActions = require('../../../actions/GroupModelActions');
var GroupModelProperties = require('../../../constants/GroupModelPropertiesConstants');
var PropertyInput = require('../utils/PropertyInput.react.js');
var FocusedMode = require('../utils/FocusedMode.react');
var mapKeyValues = require('../../../utils/mapKeyValues');
var ViewMixin = require('../../../mixins/ViewMixin');

var _properties = mapKeyValues(GroupModelProperties);


var PropertiesSidebarTab = React.createClass({

  statics: {
    title: 'properties'
  },

  mixins: [new ViewMixin(ModelStore, function getState() {
    return {
      model: ModelStore.getFocused()
    };
  })],


  render: function() {
    var group = this.state && this.state.model ? this.state.model.group : {};
    var propertyInputs = _properties.map(function(property) {
      return <PropertyInput
        key={property.key}
        property={property.value}
        value={group[property.value]}
        onChange={this._onPropertyChange}
      />;
    }, this);

    return (
      <div>
        {propertyInputs}
        <FocusedMode />
      </div>
    );
  },

  /**
   * When input value was changed by user
   * @fires ModelStore#updateGroup
   * @param property
   * @param value
   * @private
   */
  _onPropertyChange: function (property, value) {
    GroupModelActions.update(this.state.model.id, value);
  }

});

module.exports = PropertiesSidebarTab;