import React from "react";
import WithArray from "./withArray";
import { render, screen } from "@testing-library/react";
import generateProps from "../../index";
import path from "path";

describe("fake-props", () => {
  it("adds some additional test delay compared to static data.", () => {
    const firstName = "Joe";
    const friends = [
      { firstName: "Sue" },
      { firstName: "Jane" },
      { firstName: "Bob" },
    ];

    render(<WithArray firstName={firstName} friends={friends} />);

    expect(screen.getByText(firstName)).toBeInTheDocument();
    friends.map((friend) =>
      expect(screen.getByText(friend.firstName)).toBeInTheDocument()
    );
  });
});
