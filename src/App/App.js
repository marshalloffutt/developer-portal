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
    uid: '',
    gitHubUserName: '',
    profile: {},
    resources: [],
    commits: 0,
  }

  componentDidMount() {
    connection();

    const writeResources = () => {
      resourceRequests.getRequest(sessionStorage.getItem('uid'))
        .then((resources) => {
          this.setState({ resources });
        })
        .catch(err => console.error('error with resource GET', err));
    };

    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const loggedInUser = sessionStorage.getItem('gitHubUserName');
        const userId = sessionStorage.getItem('uid');
        this.setState({
          authed: true,
          gitHubUserName: loggedInUser,
          uid: userId,
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
      githubRequests.getCommits(this.state.gitHubUserName)
        .then((results) => {
          this.setState({ commits: results });
        })
        .catch(err => console.error(err));
    });
    writeResources();
  }

  writeResources = () => {
    resourceRequests.getRequest(sessionStorage.getItem('uid'))
      .then((resources) => {
        this.setState({ resources });
      })
      .catch(err => console.error('error with resource GET', err));
  };

  componentWillUnmount() {
    this.removeListener();
    authRequests.logoutUser();
  }

  isAuthenticated = (userName) => {
    const userId = authRequests.getCurrentUid();
    this.setState({
      authed: true,
      gitHubUserName: userName,
      uid: userId,
    });
    sessionStorage.setItem('gitHubUserName', userName);
    sessionStorage.setItem('uid', userId);
    this.writeResources();
  }

  deleteOne = (resourceId) => {
    resourceRequests.deleteResourceAxios(resourceId)
      .then(() => {
        // Grabbing existing state using function
        this.setState((state) => {
        // Filtering out the one resource by resourceId
          const filteredResources = state.resources.filter(resource => resource.id !== resourceId);
          return { resources: filteredResources };
        });
      })
      .catch(err => console.error('error with delete single', err));
  }

  formSubmitEvent = (newResource) => {
    resourceRequests.postRequest(newResource)
      .then(() => {
        this.setState(state => ({ resources: [...state.resources, newResource] }));
        // this.setState((state) => {
        //   const updatedResources = [...state.resources, newResource];
        //   return { resources: updatedResources };
        // });
      })
      .catch(err => console.error('error with resource post', err));
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
              profile={this.state.profile}
              commits={this.state.commits}
            />
          </div>
            <div className="col">
              <ResourceForm onSubmit={this.formSubmitEvent}/>
              <Resources
                resources={this.state.resources}
                deleteSingleResource={this.deleteOne}
                filterTutorials={this.filterTutorials}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
