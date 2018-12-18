import React from 'react';
import PropTypes from 'prop-types';
import { Input, FormGroup, Label } from 'reactstrap';

import resourceShape from '../../helpers/propz/resourceShape';

import './ResourceItem.scss';

class ResourceItem extends React.Component {
  static propTypes = {
    resource: resourceShape,
    deleteSingleResource: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleResource, resource } = this.props;
    deleteSingleResource(resource.id);
  }

  render() {
    const { resource } = this.props;

    return (
      <li className="resource-item text-center">
        <span className="col-2">{resource.name}</span>
        <span className="col-3">{resource.url}</span>
        <span className="col-1">
          <button className="btn btn-danger" onClick={this.deleteEvent}>
            <i className="fas fa-trash-alt"></i>
          </button>
        </span>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" />{' '}
            Done!
          </Label>
        </FormGroup>
      </li>
    );
  }
}

export default ResourceItem;
