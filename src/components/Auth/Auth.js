import React from 'react';
import authRequests from '../../helpers/data/authHelpers';
import './Auth.scss';

class Auth extends React.Component {
  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate().then(() => {
      this.props.isAuthenticated();
    }).catch(err => console.error('there was an error'));
  }

  render() {
    return (
      <div className="Auth">
        <button className="btn btn-success" onClick={this.authenticateUser}>Login</button>
      </div>
    );
  }
}

export default Auth;
