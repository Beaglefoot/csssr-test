import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';

import { issue, header } from './Issue.scss';

import UserInfo from '../UserInfo/UserInfo';

const Issue = ({
  title,
  number,
  created_at,
  user: { login, avatar_url: avatarUrl, html_url: htmlUrl }
}) => (
  <div className={issue}>
    <div>
      <div className={header}>{title}</div>
      <div>{`#${number}`}</div>
      <div>{`${dateFns.distanceInWordsToNow(created_at)} ago`}</div>
    </div>

    <UserInfo login={login} avatarUrl={avatarUrl} htmlUrl={htmlUrl} />
  </div>
);

Issue.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  created_at: PropTypes.string.isRequired
};

export default Issue;
