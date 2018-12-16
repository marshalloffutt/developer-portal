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
        <span className="col-7">{resource.name}</span>
        <span className="col-3">{resource.url}</span>
      </li>
    );
  }
}

export default ResourceItem;
