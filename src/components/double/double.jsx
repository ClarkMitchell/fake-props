import React from "react";
import PropTypes from "prop-types";

export default function Outer({ firstName, lastName }) {
  return (
    <article>
      <h1>{firstName}</h1>
      <Inner>{lastName}</Inner>
    </article>
  );
}

Outer.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
};

function Inner({ children }) {
  return <h2>{children}</h2>;
}
