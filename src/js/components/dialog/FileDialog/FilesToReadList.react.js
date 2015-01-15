var React = require('react-with-addons');
var Icon = require('../../utils/Icon.react');

var DataSourcesToUploadList = React.createClass({

  propTypes: {
    onRemoveItem: React.PropTypes.func.isRequired,
    items: React.PropTypes.array
  },

  render: function render() {
    var dataSources = this.props.items.map(function(dataSource, i) {

      return (
        <li className="list-group-item data-source-item" key={"data-source-" + i}>
          <span className="data-source-name">{dataSource.name}</span>
          <span className="data-source-size">{dataSource.size}</span>
          <span className="data-source-remove" data-index={i} onClick={this._removeFileToRead}><Icon type="remove" /></span>
        </li>
      );
    }, this);

    return (
      <ul className="list-group">
        {dataSources}
      </ul>
    );
  },

  /**
   * Called when users clicks remove icon
   * @param event
   */
  _removeFileToRead: function removeDataSource(event) {
    var index = parseInt(event.currentTarget.dataset.index, 10);
    this.props.onRemoveItem(this.props.items[index]);
  }

});

module.exports = DataSourcesToUploadList;