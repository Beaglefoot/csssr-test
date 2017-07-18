import React from 'react';
import dateFns from 'date-fns';

import { issue, header } from './Issue.scss';

const Issue = ({ title, number, created_at }) => (
  <div className={issue}>
    <div className={header}>{title}</div>
    <div>{`#${number}`}</div>
    <div>{`${dateFns.distanceInWordsToNow(created_at)} ago`}</div>
  </div>
);

export default Issue;
