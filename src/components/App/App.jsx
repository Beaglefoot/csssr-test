/* eslint no-unused-vars: off */
import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Search from '../Search/Search';
import Issues from '../Issues/Issues';
import Details from '../Details/Details';

import { app } from './App.scss';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      user: '',
      repo: '',
      search: ''
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(event) {
    const { name, value } = event.target;
    const newState = {};
    newState[name] = value;

    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { user, repo } = this.state;

    if (user && repo) this.setState({ search: `${user}/${repo}` });
  }



  render() {
    const { search } = this.state;

    return (
      <Router>
        <div className={app}>
          {/* Time is over here. Have to live with additional network requests... */}
          <Route exact path="/" render={() => (
            <div>
              <Search
                handleInput={this.handleInput}
                handleSubmit={this.handleSubmit}
              />

              { search &&
                <Issues search={search} />
              }
            </div>
            )}
          />

          <Route
            path="/details"
            component={Details}
          />
        </div>
      </Router>
    );
  }
}

export default App;
