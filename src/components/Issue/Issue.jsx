import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import { Link } from 'react-router-dom';

import { issue, header } from './Issue.scss';

import UserInfo from '../UserInfo/UserInfo';

const Issue = ({
  title,
  number,
  created_at: createdAt,
  user,
  ...rest
}) => (
  <div className={issue}>
    <div>
      <Link
        to={{
          pathname: '/details',
          state: { title, number, createdAt, user, ...rest }
        }}
        className={header}
      >
        {title}
      </Link>
      <div>{`#${number}`}</div>
      <div>{`${dateFns.distanceInWordsToNow(createdAt)} ago`}</div>
    </div>

    <UserInfo
      login={user.login}
      avatarUrl={user.avatar_url}
      htmlUrl={user.html_url}
    />
  </div>
);

Issue.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  created_at: PropTypes.string.isRequired
};

export default Issue;
