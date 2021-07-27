import React from "react";
import PropTypes from "prop-types";
import "parse-prop-types";

export default function Greeting({ userName, foobar }) {
  return (
    <>
      <h1>{userName}</h1>
      <p>{foobar}</p>
    </>
  );
}

Greeting.propTypes = {
  userName: PropTypes.string.isRequired,
  foobar: PropTypes.string.isRequired,
};
