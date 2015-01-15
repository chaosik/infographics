var React = require('react-with-addons');
var FormGroup = require('../../utils/FormGroup.react');

var ModelPanel = React.createClass({

  propTypes: {
    onChange: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return this.props.modelProperties;
  },

  componentWillRecieveProps: function(nextProps) {
    this.setState(nextProps.modelProperties);
  },

  render: function render() {
    return (
      <div className="form-horizontal">
        <div className="row">
          <div className="col-sm-6">
            <FormGroup label="x">
              <input className="form-control" value={this.state.x} onChange={this._setX}/>
            </FormGroup>
          </div>
          <div className="col-sm-6">
            <FormGroup label="y">
              <input className="form-control" value={this.state.y} onChange={this._setY}/>
            </FormGroup>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <FormGroup label="scale x">
              <input className="form-control" value={this.state.sx} onChange={this._setSX}/>
            </FormGroup>
          </div>
          <div className="col-sm-6">
            <FormGroup label="scale y">
              <input className="form-control" value={this.state.sy} onChange={this._setSY}/>
            </FormGroup>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <FormGroup label="rotate">
              <input className="form-control" value={this.state.r} onChange={this._setR}/>
            </FormGroup>
          </div>
          <div className="col-sm-6">
            <FormGroup label="z-index">
              <input className="form-control" value={this.state.z} onChange={this._setZ}/>
            </FormGroup>
          </div>
        </div>
      </div>
    );
  },

  _setX: function (event) {
    var value = event.target.value;
    this.setState({
      x: value
    });
    this.props.onChange(this.state);
  },

  _setY: function (event) {
    var value = event.target.value;
    this.setState({
      y: value
    });
    this.props.onChange(this.state);
  },

  _setSX: function (event) {
    var value = event.target.value;
    this.setState({
      sx: value
    });
    this.props.onChange(this.state);
  },

  _setSY: function (event) {
    var value = event.target.value;
    this.setState({
      sy: value
    });
    this.props.onChange(this.state);
  },

  _setR: function (event) {
    var value = event.target.value;
    this.setState({
      r: value
    });
    this.props.onChange(this.state);
  },

  _setZ: function (event) {
    var value = event.target.value;
    this.setState({
      z: value
    });
    this.props.onChange(this.state);
  }

});

module.exports = ModelPanel;