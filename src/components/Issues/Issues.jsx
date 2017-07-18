import React from 'react';
import PropTypes from 'prop-types';
import 'whatwg-fetch';

import Issue from '../Issue/Issue';

class Issues extends React.Component {
  constructor() {
    super();

    this.state = { issues: [], error: '' };

    this.fetchIssues = this.fetchIssues.bind(this);
  }

  fetchIssues(search) {
    return fetch(`https://api.github.com/repos/${search}/issues?page=1&per_page=3`)
      .then(response => {
        if (response.status >= 200 && response.status < 300) return response;
        else {
          const error = new Error(response.statusText);
          throw error;
        }
      })
      .then(response => response.json());
  }

  handleStateOnFetch(search) {
    this.fetchIssues(search)
      .then(issues => this.setState({ issues, error: '' }))
      .catch(({ message }) => this.setState({ error: message }));
  }

  componentDidMount() {
    this.handleStateOnFetch(this.props.search);
  }

  componentWillReceiveProps({ search }) {
    this.handleStateOnFetch(search);
  }

  render() {
    const { issues, error } = this.state;

    if (error)          return <div>{error}</div>;
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
