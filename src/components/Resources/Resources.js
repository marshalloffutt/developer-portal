import React from 'react';
import PropTypes from 'prop-types';

import resourceShape from '../../helpers/propz/resourceShape';
import ResourceItem from '../ResourceItem/ResourceItem';

import './Resources.scss';

class Resources extends React.Component {
  static propTypes = {
    resources: PropTypes.arrayOf(resourceShape),
    deleteSingleResource: PropTypes.func,
  };

  render() {
    const { resources, deleteSingleResource } = this.props;
    const resourcesItemComponents = resources.map(resource => (
      <ResourceItem
        resource={resource}
        key={resource.id}
        deleteSingleResource={deleteSingleResource}
      />
    ));
    return (
      <div className="resources col-7">
        <h2>Resources</h2>
        <ul>{resourcesItemComponents}</ul>
      </div>
    );
  }
}

export default Resources;
