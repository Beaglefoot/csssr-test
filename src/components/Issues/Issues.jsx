/* eslint no-unused-vars: off */
import React from 'react';
import PropTypes from 'prop-types';
import 'whatwg-fetch';

import Issue from '../Issue/Issue';
import Select from '../Select/Select';

import { pagination, page, row, active } from './Issues.scss';

class Issues extends React.Component {
  constructor() {
    super();

    this.state = {
      issues: [],
      error: '',
      pageNum: 1,
      perPage: 30,
      totalPages: 1
    };

    this.fetchIssues        = this.fetchIssues.bind(this);
    this.handleStateOnFetch = this.handleStateOnFetch.bind(this);
    this.handlePageClick    = this.handlePageClick.bind(this);
    this.handleSelect       = this.handleSelect.bind(this);
  }



  fetchIssues(search, pageNum, perPage) {
    return fetch(`https://api.github.com/repos/${search}/issues?page=${pageNum}&per_page=${perPage}`)
      .then(response => {
        if (response.status >= 200 && response.status < 300) return response;
        else {
          const error = new Error(response.statusText);
          throw error;
        }
      });
  }

  getTotalPages(headers) {
    return parseInt(
      headers.get('Link')
        .split(/,/)
        .find(link => link.includes('rel="last"'))
        .replace(/<.+[&?]page=(\d+).+/, (match, num) => num)
    ) - 1;
  }

  handleStateOnFetch(
    search,
    pageNum = this.state.pageNum,
    perPage = this.state.perPage
  ) {
    let totalPages;

    // this.setState({ error: '' });
    this.fetchIssues(search, pageNum, perPage)
      .then(response => {
        totalPages = this.getTotalPages(response.headers);
        return response.json();
      })
      .then(issues => {
        this.setState({ issues, error: '', totalPages, perPage });
      })
      .catch(({ message }) => this.setState({ error: message }));
  }

  handlePageClick({ target }) {
    if (!target.className.includes(page)) return;

    const pageNum = parseInt(target.innerText);

    this.setState({ pageNum, issues: [] });
    this.handleStateOnFetch(this.props.search, pageNum);
  }

  handleSelect(event) {
    const perPage = parseInt(event.target.value);
    console.log(perPage);
    this.handleStateOnFetch(this.props.search, 1, perPage);
  }

  componentDidMount() {
    this.handleStateOnFetch(this.props.search);
  }

  componentWillReceiveProps({ search }) {
    if (this.props.search !== search) this.handleStateOnFetch(search);
  }



  render() {
    const { issues, error, totalPages, perPage, pageNum } = this.state;

    if (error)          return <div>{error}</div>;
    if (!issues.length) return <div>Loading...</div>;

    return (
      <div>
        <div className={row}>
          <Select options={[10, 20, 30, 100]} defaultValue={perPage} handleSelect={this.handleSelect} />
          <div className={pagination} onClick={this.handlePageClick}>
            {
              new Array(totalPages).fill().map((_, index) => (
                <div
                  className={`
                    ${page}
                    ${pageNum === index + 1 ? ' '.concat(active) : ''}
                  `}
                  key={index}
                >
                  {index + 1}
                </div>
              ))
            }
          </div>
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
