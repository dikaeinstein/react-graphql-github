import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Profile from '../components/Profile';
import Organization from '../components/Organization';
import Navigation from '../components/Navigation';
import * as routes from '../constants/routes';
import './App.css';

class App extends Component {
  state = {
    organizationName: 'the-road-to-learn-react',
  };

  onOrganizationSearch = value => {
    this.setState({ organizationName: value });
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Navigation
            organizationName={this.state.organizationName}
            onOrganizationSearch={this.onOrganizationSearch}
          />
          <div className="App-main">
            <Route
              exact
              path={routes.ORGANIZATION}
              component={() => (
                <div className="App-content-large-header">
                  <Organization organizationName={this.state.organizationName} />
                </div>
              )}
            />
            <Route
              exact
              path={routes.PROFILE}
              component={() => (
                <div className="App-content-small-header">
                  <Profile />
                </div>
              )}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
