/* eslint no-unused-vars: off */
import React from 'react';
import PropTypes from 'prop-types';
import 'whatwg-fetch';

import Issue from '../Issue/Issue';

import { pagination, page } from './Issues.scss';

class Issues extends React.Component {
  constructor() {
    super();

    this.state = {
      issues: [],
      error: '',
      pageNum: 1,
      perPage: 30
    };

    this.fetchIssues = this.fetchIssues.bind(this);
    this.handleStateOnFetch = this.handleStateOnFetch.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }



  fetchIssues(search, pageNum, perPage) {
    return fetch(`https://api.github.com/repos/${search}/issues?page=${pageNum}&per_page=${perPage}`)
      .then(response => {
        if (response.status >= 200 && response.status < 300) return response;
        else {
          const error = new Error(response.statusText);
          throw error;
        }
      })
      .then(response => response.json());
  }

  handleStateOnFetch(search, pageNum = this.state.pageNum) {
    const { perPage } = this.state;

    // this.setState({ error: '' });
    this.fetchIssues(search, pageNum, perPage)
      .then(issues => this.setState({ issues, error: '' }))
      .catch(({ message }) => this.setState({ error: message }));
  }

  handlePageClick({ target }) {
    if (!target.className.includes(page)) return;

    const pageNum = parseInt(target.innerText);
    this.setState({ pageNum, issues: [] });
    this.handleStateOnFetch(this.props.search, pageNum);
  }

  componentDidMount() {
    this.handleStateOnFetch(this.props.search);
  }

  componentWillReceiveProps({ search }) {
    if (this.props.search !== search) this.handleStateOnFetch(search);
  }



  render() {
    const { issues, error } = this.state;

    if (error)          return <div>{error}</div>;
    if (!issues.length) return <div>Loading...</div>;

    return (
      <div>
        <div className={pagination} onClick={this.handlePageClick}>
          {
            new Array(20).fill().map((_, index) => (
              <div className={page} key={index}>{index + 1}</div>
            ))
          }
        </div>

        <div>
          {
            issues.map(issue => (
              <Issue key={issue.id} {...issue} />
            ))
          }
        </div>
      </div>
    );
  }
}

Issues.propTypes = {
  search: PropTypes.string.isRequired
};

export default Issues;
