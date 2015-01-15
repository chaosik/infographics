var React = require('react-with-addons');
var DocumentStore = require('../../../../stores/DocumentStore');
var DocumentActions = require('../../../../actions/DocumentActions');
var ViewMixin = require('../../../../mixins/ViewMixin');
var FormGroup = require('../../../utils/FormGroup.react');
var Icon = require('../../../utils/Icon.react');

var DocumentProperties = React.createClass({

  propTypes: {
    onChange: React.PropTypes.func.isRequired
  },

  mixins: [ViewMixin(DocumentStore)],

  getStateFromStore: function getStateFromStore() {
    return {
      document: DocumentStore.getSelectedDocument()
    };
  },

  render: function() {
    var document = this.state.document;
    var className = 'form-horizontal' + (this.props.visible ? '' : ' hidden');

    return (
      <div className={className}>
        <div className="row">
          <div className="col-sm-12">
            <button className="btn btn-primary" onClick={this._toList}>Document List <Icon type="list" /></button>
            <button className="btn btn-primary" onClick={this._saveDocument}>Save Document</button>
          </div>

          <div className="col-sm-12">
            <FormGroup label="name">
              <input className="form-control" value={document.name} onChange={this._setName}/>
            </FormGroup>
          </div>

          <div className="col-sm-12">
            <FormGroup label="width">
              <input className="form-control" type="number" value={document.width} onChange={this._setWidth}/>
            </FormGroup>
          </div>

          <div className="col-sm-12">
            <FormGroup label="height">
              <input className="form-control" type="number" value={document.height} onChange={this._setHeight}/>
            </FormGroup>
          </div>

          <div className="col-sm-12">
            <FormGroup label="bg color">
              <input className="form-control" value={document.bgcolor} onChange={this._setBgcolor}/>
            </FormGroup>
          </div>

        </div>
      </div>
    );
  },

  _setName: function (event) {
    var value = event.target.value;
    DocumentActions.updateDocument({
      name: value
    });
  },

  _setWidth: function (event) {
    var value = event.target.value;
    DocumentActions.updateDocument({
      width: value
    });
  },

  _setHeight: function (event) {
    var value = event.target.value;
    DocumentActions.updateDocument({
      height: value
    });
  },

  _setBgcolor: function (event) {
    var value = event.target.value;
    DocumentActions.updateDocument({
      bgcolor: value
    });
  },

  _toList: function () {
    this.props.onChange();
  }

});

module.exports = DocumentProperties;