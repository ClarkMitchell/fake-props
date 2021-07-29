import React from "react";
import PropTypes from "prop-types";
import "parse-prop-types";

export default function Greeting({ firstName, address }) {
  return (
    <article>
      <h1>{firstName}</h1>
      <h2>Address</h2>
      <p>Street: {address.streetAddress}</p>
      <p>City: {address.cityName}</p>
      <p>Zip Code: {address.zipCode}</p>
    </article>
  );
}

Greeting.propTypes = {
  firstName: PropTypes.string.isRequired,
  address: PropTypes.shape({
    streetAddress: PropTypes.string.isRequired,
    cityName: PropTypes.string.isRequired,
    zipCode: PropTypes.string.isRequired,
  }).isRequired,
};
