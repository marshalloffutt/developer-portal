import React from 'react';
import PropTypes from 'prop-types';
import authRequests from '../../helpers/data/authRequests';
import './Auth.scss';

class Auth extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.func,
  }

  authenticateUser = (e) => {
    e.preventDefault();
    authRequests
      .authenticate()
      .then((results) => {
        const userName = results.additionalUserInfo.username;
        this.props.isAuthenticated(userName);
      })
      .catch(err => console.error('there was an error'));
  }

  render() {
    return (
      <div className="Auth">
        <button className="btn-lg btn-outline-secondary" id="ghbtn" onClick={this.authenticateUser}>Login with GitHub <i className="fab fa-github"></i></button>
      </div>
    );
  }
}

export default Auth;
