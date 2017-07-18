import React from 'react';
import PropTypes from 'prop-types';
import 'whatwg-fetch';

import Issue from '../Issue/Issue';

class Issues extends React.Component {
  constructor() {
    super();

    this.state = { issues: [] };

    this.fetchIssues = this.fetchIssues.bind(this);
  }

  fetchIssues(search) {
    return fetch(`https://api.github.com/repos/${search}/issues?page=1&per_page=3`)
      .then(response => response.json())
      .catch(err => console.log(`fetch was unsuccessful: ${err}`));
  }

  componentDidMount() {
    this.fetchIssues(this.props.search)
      .then(issues => this.setState({ issues }));
  }

  componentWillReceiveProps({ search }) {
    this.fetchIssues(search)
      .then(issues => this.setState({ issues }));
  }

  render() {
    const { issues } = this.state;

    if (!issues.length) return <div>Loading...</div>;

    return (
      <div>
        {
          issues.map(issue => (
            <Issue key={issue.id} {...issue} />
          ))
        }
      </div>
    );
  }
}

Issues.propTypes = {
  search: PropTypes.string.isRequired
};

export default Issues;
