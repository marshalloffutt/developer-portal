import React from 'react';
import PropTypes from 'prop-types';
import { Input, FormGroup, Label } from 'reactstrap';

import resourceShape from '../../helpers/propz/resourceShape';

import './ResourceItem.scss';

class ResourceItem extends React.Component {
  static propTypes = {
    resource: resourceShape,
    deleteSingleResource: PropTypes.func,
    updateSingleResource: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleResource, resource } = this.props;
    deleteSingleResource(resource.id);
  }

  finishEvent = (e) => {
    e.preventDefault();
    const { updateSingleResource, resource } = this.props;
    const isDone = e.target.checked;
    updateSingleResource(resource.id, isDone);
  }

  render() {
    const { resource } = this.props;

    return (
      <li className="resource-item text-center">
        <span className="col-3">{resource.name}</span>
        <a href={resource.url} className="col-4 _blank link-text">{resource.url}</a>
        <span className="col-2">
          <button className="btn btn-danger" onClick={this.deleteEvent}>
            <i className="fas fa-trash-alt"></i>
          </button>
        </span>
        <FormGroup className="col-1 d-flex align-items-center">
          <Label check>
            <Input
              type="checkbox"
              className="form-check-input"
              checked={resource.isDone}
              onChange={this.finishEvent}/>
            Done!
          </Label>
        </FormGroup>
      </li>
    );
  }
}

export default ResourceItem;
