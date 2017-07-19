import React from 'react';
import PropTypes from 'prop-types';

import { avatar, user, author } from './UserInfo.scss';

const UserInfo = ({ login, avatarUrl, htmlUrl }) => (
  <div className={author}>
    <img className={avatar} src={avatarUrl} />
    <a className={user} href={htmlUrl}>{login}</a>
  </div>
);

UserInfo.propTypes = {
  login: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  htmlUrl: PropTypes.string.isRequired
};

export default UserInfo;
