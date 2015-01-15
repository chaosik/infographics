var React = require('react-with-addons');
var d3 = require('d3');
var Model = require('./Model.react.js');
var GroupModelActions = require('../../actions/GroupModelActions');
var GroupModelContours = require('./GroupModelContours.react');
var ModelComponent = require('./ModelComponent.react');
var pick = require('lodash').pick;
var ModelActions = require('../../actions/ModelActions');

var GroupModel = React.createClass({

  getInitialState: function() {
    return {
      groupModelDOM: null
    };
  },

  componentDidMount: function () {
    var el = this.getDOMNode();
    var drag = d3.behavior.drag()
      .origin(function (d) {
        var props = this.props.modelProperties;
        return pick(props, ['x', 'y']);
      }.bind(this))
      .on('dragstart', function(d) {
        ModelActions.select(this.props.index);
      }.bind(this))
      .on('drag', function(d) {
        GroupModelActions.drag(this.props.index, {
          x: d3.event.x,
          y: d3.event.y
        });
      }.bind(this))
      .on('dragend', function(d) {
      });

    d3.select(el)
      .call(drag);

    this.setState({
      groupModelDOM: this.refs.groupModel.getDOMNode()
    });
  },

  render: function() {
    var props = this.props.modelProperties;
    var transform =
      'translate(' + props.x + ',' + props.y + ') ' +
      'rotate(' + props.r + ')'/* ' +
        ((model.width / 2) * props.sx) + ' ' +
        ((model.height / 2) * props.sy) + ') '*/ +
      'scale(' + props.sx + ',' + props.sy + ')';

    return (
      <g>
        <g ref="groupModel" transform={transform}>
          <ModelComponent
            query={this.props.query}
            column={this.props.column}
            template={this.props.template}
            templateProperties={this.props.templateProperties} />
        </g>
        <GroupModelContours index={this.props.index} node={this.state.groupModelDOM}/>
      </g>
    );
  }
});

module.exports = GroupModel;