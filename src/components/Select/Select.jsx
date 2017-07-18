import React from 'react';
import PropTypes from 'prop-types';

import { select } from './Select.scss';

const Select = ({ options, defaultValue, handleSelect }) => (
  <select
    className={select}
    defaultValue={defaultValue}
    onChange={handleSelect}
  >
    {
      options.map(option => (
        <option value={option} key={option}>{option}</option>
      ))
    }
  </select>
);

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.number).isRequired,
  defaultValue: PropTypes.number.isRequired,
  handleSelect: PropTypes.func.isRequired
};

export default Select;
