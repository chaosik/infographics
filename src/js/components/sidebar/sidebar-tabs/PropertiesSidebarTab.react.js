var React = require('react-with-addons');
var ModelStore = require('../../../stores/ModelStore');
var GroupModelActions = require('../../../actions/GroupModelActions');
var GroupModelProperties = require('../../../constants/GroupModelPropertiesConstants');
var PropertyInput = require('../utils/PropertyInput.react.js');
var FocusedMode = require('../utils/FocusedMode.react');
var mapKeyValues = require('../../../utils/mapKeyValues');
var ViewMixin = require('../../../mixins/ViewMixin');
var ModelPanel = require('../../dialog/ModelDialog/ModelPanel.react');

var _properties = mapKeyValues(GroupModelProperties);



var PropertiesSidebarTab = React.createClass({

  statics: {
    title: 'properties'
  },

  mixins: [ViewMixin(ModelStore)],

  getStateFromStore: function getStateFromStore() {
    return {
      models: ModelStore.getModels(),
      selectedIndex: ModelStore.getSelectedIndex()
    };
  },


  render: function() {
    var model = this.state.models[this.state.selectedIndex];
    if (model) {
      return (
        <ModelPanel onChange={this._onChange} modelProperties={model.modelProperties}/>
      );
    } else {
      return (
        <div>Select a Model First</div>
      );
    }
    //var group = this.state && this.state.model ? this.state.model.group : {};
    //var propertyInputs = _properties.map(function(property) {
    //  return <PropertyInput
    //    key={property.key}
    //    property={property.value}
    //    value={group[property.value]}
    //    onChange={this._onPropertyChange}
    //  />;
    //}, this);
    //
    //return (
    //  <div>
    //    {propertyInputs}
    //    <FocusedMode />
    //  </div>
    //);
  },

  _onChange: function (modelProperties) {
    GroupModelActions.update(this.state.selectedIndex, modelProperties);
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