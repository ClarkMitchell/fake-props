import React from "react";
import PropTypes from "prop-types";

export default function WithArray({ firstName, friends }) {
  return (
    <article>
      <h1>{firstName}</h1>
      <ul>
        {friends.map((friend) => (
          <li key={friend.firstName}>{friend.firstName}</li>
        ))}
      </ul>
    </article>
  );
}

WithArray.propTypes = {
  firstName: PropTypes.string.isRequired,
  friends: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string.isRequired,
    })
  ).isRequired,
};
