import React from 'react';
import PropTypes from 'prop-types';

import resourceShape from '../../helpers/propz/resourceShape';
import ResourceItem from '../ResourceItem/ResourceItem';
import FilterButtons from '../Buttons/Buttons';

import './Resources.scss';

class Resources extends React.Component {
  static propTypes = {
    resources: PropTypes.arrayOf(resourceShape),
    deleteSingleResource: PropTypes.func,
  };

  state = {
    filterType: 'tutorial',
  }

  changeType = (filterType) => {
    this.setState({ filterType });
  }

  render() {
    const { resources, deleteSingleResource } = this.props;
    const { filterType } = this.state;
    const resourcesItemComponents = resources
      .filter(resource => resource.type === filterType)
      .map(resource => (
      <ResourceItem
        resource={resource}
        key={resource.id}
        deleteSingleResource={deleteSingleResource}
      />
      ));
    return (
      <div className="resources">
        <div className="ml-5">
          <FilterButtons
            changeType={this.changeType}
          />
        </div>
        <ul className="res">{resourcesItemComponents}</ul>
      </div>
    );
  }
}

export default Resources;
