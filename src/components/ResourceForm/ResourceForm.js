import React from 'react';
import './ResourceForm.scss';

class ResourceForm extends React.Component {
  render() {
    return (
      <div className="InputForm">
      <form className="row">
        <div className="form-group col-md-7">
          <div className="input-group">
            <span className="mr-2 mt-1">Name:</span>
            <input
              type="text"
              className="form-control"
              id="name"
            />
          </div>
          <br />
          <div className="input-group">
            <span className="mr-2 mt-1">Link:</span>
            <input
              type="text"
              className="form-control"
              id="url"
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
            />
            <label className="form-check-label" htmlFor="docs">
              Documentation
            </label>
          </div>
        </div>
        <div className="form-group m-5 col-2">
          {/* <button type="submit" className="submit-button"> */}
          <i className="fas fa-plus-circle fa-3x"/>
          {/* </button> */}
        </div>
      </form>
    </div>
    );
  }
}

export default ResourceForm;
