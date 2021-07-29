import React from "react";
import PropTypes from "prop-types";

export default function Optional({ userName, foobar }) {
  return (
    <article>
      <h1>{userName}</h1>
      {foobar && <p>{foobar}</p>}
    </article>
  );
}

Optional.propTypes = {
  userName: PropTypes.string.isRequired,
  foobar: PropTypes.string,
};
