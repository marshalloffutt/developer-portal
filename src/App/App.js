import React, { Component } from 'react';

import connection from '../helpers/data/connection';

import Auth from '../components/Auth/Auth';
import Tutorials from '../components/Tutorials/Tutorials';
import Profile from '../components/Profile/Profile';
import Commits from '../components/Commits/Commits';
import Mavbar from '../components/Mavbar/Mavbar';

import './App.scss';

class App extends Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    connection();
  }

  isAuthenticated = () => {
    this.setState({ authed: true });
  }

  render() {
    if (!this.state.authed) {
      return (
        <div className="App">
          <Mavbar />
          <Auth isAuthenticated={this.isAuthenticated}/>
        </div>
      );
    }
    return (
      <div className="App">
        <Mavbar />
        <Tutorials />
        <Profile />
        <Commits />
      </div>
    );
  }
}

export default App;
