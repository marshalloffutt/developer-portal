import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import connection from '../helpers/data/connection';
import authRequests from '../helpers/data/authRequests';
import resourceRequests from '../helpers/data/resourceRequests';
import githubRequests from '../helpers/data/githubRequests';

import Auth from '../components/Auth/Auth';
import Resources from '../components/Resources/Resources';
import Profile from '../components/Profile/Profile';
import ResourceForm from '../components/ResourceForm/ResourceForm';
import Mavbar from '../components/Mavbar/Mavbar';

import './App.scss';

class App extends Component {
  state = {
    authed: false,
    gitHubUserName: '',
    profile: {},
    resources: [],
  }

  componentDidMount() {
    connection();

    const writeResources = () => {
      const uid = authRequests.getCurrentUid();
      resourceRequests.getRequest(uid)
        .then((resources) => {
          this.setState({ resources });
        })
        .catch(err => console.error('error with resource GET', err));
    };

    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const loggedInUser = sessionStorage.getItem('gitHubUserName');
        writeResources();
        this.setState({
          authed: true,
          gitHubUserName: loggedInUser,
        });
      } else {
        this.setState({
          authed: false,
        });
      }
      githubRequests.getUser(this.state.gitHubUserName)
        .then((results) => {
          this.setState({ profile: results });
        })
        .catch(err => console.error(err));
    });
  }

  componentWillUnmount() {
    this.removeListener();
    authRequests.logoutUser();
  }

  isAuthenticated = (userName) => {
    this.setState({
      authed: true,
      gitHubUserName: userName,
    });
    sessionStorage.setItem('gitHubUserName', userName);
  }

  deleteOne = (resourceId) => {
    resourceRequests.deleteResourceAxios(resourceId)
      .then(() => {
        resourceRequests.getRequest()
          .then((resources) => {
            this.setState({ resources });
          });
      })
      .catch(err => console.error('error with delete single', err));
  }

  render() {
    const logoutClicky = () => {
      authRequests.logoutUser();
      sessionStorage.clear();
      this.setState({
        authed: false,
        uid: '',
        gitHubUserName: '',
      });
    };

    if (!this.state.authed) {
      return (
        <div className="App">
          <Mavbar isAuthed={this.state.authed} logoutClicky={logoutClicky}/>
          <div className="row">
            <Auth isAuthenticated={this.isAuthenticated}/>
          </div>
        </div>
      );
    }
    return (
      <div className="App">
        <Mavbar isAuthed={this.state.authed} logoutClicky={logoutClicky}/>
        <div className="container-fluid">
          <div className="row justify-content-around py-3">
          <div className="col-3">
            <Profile
              profile={this.state.profile} />
          </div>
            <div className="col">
              <ResourceForm />
              <Resources
                resources={this.state.resources}
                deleteSingleResource={this.deleteOne}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
