import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RepoList({ key, repoName }) {
  return (
    <li key={key}>
      <span>{repoName}</span>
      <Link to={`/repository/${encodeURIComponent(repoName)}`}>Detalhes</Link>
    </li>
  );
}

export default RepoList;
