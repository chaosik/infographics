var React = require('react-with-addons');
var d3 = require('d3');
var Model = require('./Model.react.js');
var GroupModelActions = require('../../actions/GroupModelActions');
var GroupModelContours = require('./GroupModelContours.react');
var pick = require('lodash').pick;


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
        return pick(this.props, ['x', 'y']);
      }.bind(this))
      .on('dragstart', function(d) {
        GroupModelActions.focus(this.props.groupId);
      }.bind(this))
      .on('drag', function(d) {
        GroupModelActions.drag(this.props.groupId, {
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
    var model = this.props.model;
    var transform =
      'translate(' + this.props.x + ',' + this.props.y + ') ' +
      'rotate(' + this.props.rotation + ' ' +
        ((model.width / 2) * this.props.scale) + ' ' +
        ((model.height / 2) * this.props.scale) + ') ' +
      'scale(' + this.props.scale + ')';

    return (
      <g>
        <g ref="groupModel" key="groupModel" transform={transform}>
          <Model model={model} />
        </g>
        <GroupModelContours visible={this.props.focus} node={this.state.groupModelDOM}/>
      </g>
    );
  }
});

module.exports = GroupModel;