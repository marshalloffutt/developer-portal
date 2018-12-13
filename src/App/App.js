import React, { Component } from 'react';

import connection from '../helpers/data/connection';
import Tutorials from '../components/Tutorials/Tutorials';
import Profile from '../components/Profile/Profile';
import Commits from '../components/Commits/Commits';

import Auth from '../components/Auth/Auth';

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
          <Auth isAuthenticated={this.isAuthenticated}/>
        </div>
      );
    }
    return (
      <div className="App">
        <Tutorials />
        <Profile />
        <Commits />
      </div>
    );
  }
}

export default App;
