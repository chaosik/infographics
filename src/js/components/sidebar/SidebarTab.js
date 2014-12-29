var React = require('react-with-addons');
var classSet = React.addons.classSet;
var Icon = require('../utils/Icon.react.js');

var SidebarTab = React.createClass({

  getInitialState: function() {
    return {
      expanded: false,
      height: 0
    };
  },

  render: function() {
    var className = classSet({
      'tab': true,
      'expanded': this.state.expanded
    });

    return (
      <div className={className}>
        <header onClick={this._toggleVisibility}>
          <Icon type="arrow" selector="icon"/>
          {this.props.title}
        </header>

        <div className="content" style={{height: this.state.height}}>
          <div className="measure" ref="measureHeight">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  },

  _toggleVisibility: function () {
    this.setState({
      expanded: !this.state.expanded,
      height: this.state.expanded ? 0 : this.refs.measureHeight.getDOMNode().clientHeight
    });
  }
});

module.exports = SidebarTab;