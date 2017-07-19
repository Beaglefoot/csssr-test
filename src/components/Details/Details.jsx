import React from 'react';
import { Link } from 'react-router-dom';

import UserInfo from '../UserInfo/UserInfo';

import {
  githubUrl,
  name,
  status,
  active,
  details,
  back,
  row
} from './Details.scss';

const Details = props => {
  if (typeof props.location.state === 'undefined') {
    return (
      <div>
        <div>No issue was chosen</div>
        <Link to="/">Return</Link>
      </div>
    );
  }

  const {
    location: {
      state: {
        title,
        number,
        created_at,
        state,
        html_url: url,
        user
      }
    }
  } = props;

  return (
    <div className={details}>
      <div className={row}>
        <div>
          <div className={name}>{title}</div>
          <div>{`#${number}`}</div>
          <div>{created_at}</div>
          <div
            className={`${status}${state === 'open' ? ' '.concat(active) : ''}`}
          >
            {state}
          </div>
          <a className={githubUrl} href={url}>{url}</a>
        </div>

        <UserInfo login={user.login} avatarUrl={user.avatar_url} htmlUrl={user.html_url} />
      </div>

      <Link className={back} to="/">Return</Link>
    </div>
  );
};

export default Details;
