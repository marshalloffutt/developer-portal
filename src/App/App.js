import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import connection from '../helpers/data/connection';

import Auth from '../components/Auth/Auth';
import Mavbar from '../components/Mavbar/Mavbar';
import Profile from '../components/Profile/Profile';
import Resources from '../components/Resources/Resources';
import ResourceForm from '../components/ResourceForm/ResourceForm';

import resourceRequests from '../helpers/data/resourceRequests';

import './App.scss';
import authRequests from '../helpers/data/authRequests';
import githubRequests from '../helpers/data/githubRequests';

class App extends Component {
  state = {
    authed: false,
    githubUser: '',
    profile: [],
    resources: [],
  };

  componentDidUpdate() {
    if (this.state.githubUser && this.state.profile.length === 0) {
      githubRequests.getUser(this.state.githubUser)
        .then((profile) => {
          this.setState({ profile });
        })
        .catch(err => console.error('error with getting github user', err));
    }
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
        const loggedInUser = sessionStorage.getItem('githubUser');
        writeResources();
        this.setState({
          authed: true,
          githubUser: loggedInUser,
        });
      } else {
        this.setState({
          authed: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  isAuthenticated = (username) => {
    this.setState({ authed: true, githubUser: username });
    sessionStorage.setItem('githhubUser', username);
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
      this.setState({ authed: false, githubUser: '' });
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
        <div className="row">
          <Profile
          profile={this.state.profile}
          />
          <ResourceForm />
        </div>
        <div className="row">
          <Resources
            resources={this.state.resources}
            deleteSingleResource={this.deleteOne}
          />
        </div>
      </div>
    );
  }
}

export default App;
