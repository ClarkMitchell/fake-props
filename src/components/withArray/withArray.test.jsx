import React from "react";
import WithArray from "./withArray";
import { render, screen } from "@testing-library/react";
import generateProps from "../../index";
import path from "path";

describe("fake-props", () => {
  it("can generate props for a component with a prop array.", () => {
    const { firstName, friends } = generateProps(
      path.join(__dirname, "./withArray.jsx")
    );

    render(<WithArray firstName={firstName} friends={friends} />);

    expect(screen.getByText(firstName)).toBeInTheDocument();
    friends.map((friend) =>
      expect(screen.getByText(friend.firstName)).toBeInTheDocument()
    );
  });
});
