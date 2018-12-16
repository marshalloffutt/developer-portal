import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import connection from '../helpers/data/connection';

import Auth from '../components/Auth/Auth';
import Resources from '../components/Resources/Resources';
import Profile from '../components/Profile/Profile';
import ResourceForm from '../components/ResourceForm/ResourceForm';
import Mavbar from '../components/Mavbar/Mavbar';

import resourceRequests from '../helpers/data/resourceRequests';

import './App.scss';
import authRequests from '../helpers/data/authRequests';

class App extends Component {
  state = {
    authed: false,
    resources: [],
  }

  componentDidMount() {
    connection();

    resourceRequests.getRequest()
      .then((resources) => {
        this.setState({ resources });
      })
      .catch(err => console.error('error with resource GET', err));

    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
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

  isAuthenticated = () => {
    this.setState({ authed: true });
  }

  render() {
    const logoutClicky = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
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
          <Profile />
          <ResourceForm />
        </div>
        <div className="row">
          <Resources resources={this.state.resources}/>
        </div>
      </div>
    );
  }
}

export default App;
