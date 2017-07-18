/* eslint no-unused-vars: off */
import React from 'react';

import Search from '../Search/Search';
import Issues from '../Issues/Issues';

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
      <div>
        <Search
          handleInput={this.handleInput}
          handleSubmit={this.handleSubmit}
        />

        { search &&
          <Issues search={search} />
        }
        {'user: '}
        {this.state.user}
        <br />
        {'repo: '}
        {this.state.repo}
      </div>
    );
  }
}

export default App;
