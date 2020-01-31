/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React from 'react';
import propTypes from 'prop-types';

function IssueGroup({ key, avatar_url, alt, linkTo, title, user, labels }) {
  return (
    <li key={key}>
      <img src={avatar_url} alt={alt} />
      <div>
        <strong>
          <a href={linkTo}>{title}</a>
          {labels.map(label => (
            <span key={String(label.id)}>{label.name}</span>
          ))}
        </strong>
        <p>{user}</p>
      </div>
    </li>
  );
}

IssueGroup.propTypes = {
  key: propTypes.string,
  avatar_url: propTypes.string,
  alt: propTypes.string,
  linkTo: propTypes.string,
  title: propTypes.string,
  user: propTypes.string,
  labels: propTypes.string,
};

export default IssueGroup;
