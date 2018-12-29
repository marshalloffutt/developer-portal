import React from 'react';
import './ResourceForm.scss';
import PropTypes from 'prop-types';
import authRequests from '../../helpers/data/authRequests';

const defaultResource = {
  name: '',
  url: '',
  type: '',
  isDone: false,
  uid: '',
};

class ResourceForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  }

  state = {
    newResource: defaultResource,
    radioChecked: false,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempResource = { ...this.state.newResource };
    tempResource[name] = e.target.value;
    this.setState({ newResource: tempResource });
  };

  nameChange = e => this.formFieldStringState('name', e);

  urlChange = e => this.formFieldStringState('url', e);

  typeChange = (e) => {
    this.setState({ radioChecked: e.target.value });
    this.formFieldStringState('type', e);
  };

  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const newResource = { ...this.state.newResource };
    newResource.uid = authRequests.getCurrentUid();
    onSubmit(newResource);
    this.setState({
      newResource: defaultResource,
      radioChecked: false,
    });
  };

  render() {
    const { newResource, radioChecked } = this.state;
    return (
      <div className="InputForm">
        <form className="row" onSubmit={this.formSubmit}>
          <div className="form-group col-md-7">
            <div className="input-group">
              <span className="mr-2 mt-1">Name:</span>
              <input
                type="text"
                className="form-control"
                id="name"
                value={newResource.name}
                onChange={this.nameChange}
              />
            </div>
            <br />
            <div className="input-group">
              <span className="mr-2 mt-1">Link:</span>
              <input
                type="text"
                className="form-control"
                id="url"
                value={newResource.url}
                onChange={this.urlChange}
              />
            </div>
          </div>

          <div className="form-group col-md-1 align-self-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="resourceRadios"
                id="tutorials"
                value="tutorial"
                checked={radioChecked === 'tutorial'}
                onChange={this.typeChange}
              />
              <label className="form-check-label" htmlFor="tutorials">
                Tutorial
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="resourceRadios"
                id="blogs"
                value="blog"
                checked={radioChecked === 'blog'}
                onChange={this.typeChange}
              />
              <label className="form-check-label" htmlFor="blogs">
                Blog
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="resourceRadios"
                id="podcasts"
                value="podcast"
                checked={radioChecked === 'podcast'}
                onChange={this.typeChange}
              />
              <label className="form-check-label" htmlFor="podcasts">
                Podcast
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="resourceRadios"
                id="docs"
                value="doc"
                checked={radioChecked === 'doc'}
                onChange={this.typeChange}
              />
              <label className="form-check-label" htmlFor="docs">
                Documentation
              </label>
            </div>
          </div>

          <div className="form-group m-5 col-2">
            <button type="submit" className="submit-button btn btn-primary">
              + Resource
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ResourceForm;
