import React from 'react';

import resourceShape from '../../helpers/propz/resourceShape';

import './ResourceItem.scss';

class ResourceItem extends React.Component {
  static propTypes = {
    resource: resourceShape,
  }

  render() {
    const { resource } = this.props;

    return (
      <li className="resource-item text-center">
        <span className="col-2">{resource.name}</span>
        <span className="col-3">{resource.url}</span>
        <span className="col-2">
              <button className="btn btn-danger">
                <i className="fas fa-trash-alt"></i>
              </button>
            </span>
      </li>
    );
  }
}

export default ResourceItem;
