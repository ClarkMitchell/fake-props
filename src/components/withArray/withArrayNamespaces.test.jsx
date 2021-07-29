import React from "react";
import WithArray from "./withArray";
import { render, screen } from "@testing-library/react";
import generateProps from "../../index";
import path from "path";

describe("fake-props", () => {
  it("can generate props data from a subset of faker.js's namespaces.", () => {
    const { firstName, friends } = generateProps(
      path.join(__dirname, "./withArray.jsx"),
      { namespaces: ["name"] }
    );

    render(<WithArray firstName={firstName} friends={friends} />);

    expect(screen.getByText(firstName)).toBeInTheDocument();
    friends.map((friend) =>
      expect(screen.getByText(friend.firstName)).toBeInTheDocument()
    );
  });
});
