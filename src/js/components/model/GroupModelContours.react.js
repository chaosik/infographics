var React = require('react-with-addons');
var ModelStore = require('../../stores/ModelStore');
var ViewMixin = require('../../mixins/ViewMixin');


var GroupModelContours = React.createClass({

  mixins: [ViewMixin(ModelStore)],

  getStateFromStore: function () {
    return {
      selected: ModelStore.getSelectedIndex()
    };
  },

  render: function() {
    /* eslint eqeqeq: 0 */
    if (this.props.node && this.props.index == this.state.selected) {
      var d = 5;
      var d2 = d * 2;
      var model = this.props.node.getBoundingClientRect();
      var offsetParent = this.props.node.offsetParent;
      var transform = "translate(" +
        (model.left - offsetParent.offsetLeft) + ", " +
        (model.top - offsetParent.offsetTop) + ")";

      return (
        <g className="contours" transform={transform}>
          <rect className="ns-resize" x={d} y={-d} width={model.width - d2} height={d2} />
          <rect className="ns-resize" x={d} y={model.height - d} width={model.width - d2} height={d2} />
          <rect className="ew-resize" x={-d} y={d} width={d2} height={model.height - d2} />
          <rect className="ew-resize" x={model.width - d} y={d} width={d2} height={model.height - d2} />
          <rect className="nwse-resize" x={-d} y={-d} width={d2} height={d2} />
          <rect className="nesw-resize" x={model.width - d} y={-d} width={d2} height={d2} />
          <rect className="nwse-resize" x={model.width - d} y={model.height - d} width={d2} height={d2} />
          <rect className="nesw-resize" x={-d} y={model.height - d} width={d2} height={d2} />
        </g>
      );
    } else {
      return <g className="no-contours"></g>;
    }
  }
});

module.exports = GroupModelContours;