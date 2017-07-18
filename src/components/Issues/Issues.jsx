import React from 'react';
import 'whatwg-fetch';

import Issue from '../Issue/Issue';

class Issues extends React.Component {
  constructor() {
    super();

    this.state = { issues: '' };
  }

  componentDidMount() {
    fetch('https://api.github.com/repos/date-fns/date-fns/issues?page=1&per_page=3')
      .then(response => response.json())
      .then(issues => this.setState({ issues }));
  }

  render() {
    const { issues } = this.state;

    if (!issues) return <div>Loading...</div>;

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

export default Issues;
