import React from "react";
import PropTypes from "prop-types";

export default function Greeting({ userName, lastName, someString }) {
  return (
    <article>
      <h1>{userName}</h1>
      <p>{lastName}</p>
      <p>{someString}</p>
    </article>
  );
}

Greeting.propTypes = {
  userName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  someString: PropTypes.string.isRequired,
};
