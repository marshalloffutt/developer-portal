import React from 'react';
import PropTypes from 'prop-types';
import resourceShape from '../../helpers/propz/resourceShape';
import './Resources.scss';

class Resources extends React.Component {
  static propTypes = {
    resources: PropTypes.arrayOf(resourceShape),
  }

  render() {
    return (
      <div className="resources col">
        <h2>Resources</h2>
      </div>
    );
  }
}

export default Resources;
