import React from 'react';

import { form, button, input, delimiter } from './Search.scss';

const Search = ({ handleInput, handleSubmit }) => (
  <form className={form} onSubmit={handleSubmit}>
    <input
      className={input}
      onInput={handleInput}
      type="search"
      name="user"
      placeholder="Username"
    />

    <div className={delimiter}>{' / '}</div>

    <input
      className={input}
      onInput={handleInput}
      type="search"
      name="repo"
      placeholder="Repository"
    />

    <button className={button} type="submit">
      Search
    </button>
  </form>
);

export default Search;
