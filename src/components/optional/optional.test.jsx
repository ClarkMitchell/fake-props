import React from "react";
import Optional from "./optional";
import { render, screen } from "@testing-library/react";
import generateProps from "../../index";
import path from "path";

describe("fake-props", () => {
  it("provides optional props if instructed to.", () => {
    const { userName, foobar } = generateProps(
      path.join(__dirname, "./optional.jsx"),
      { optional: true }
    );
    render(<Optional userName={userName} foobar={foobar} />);

    expect(screen.getByText(userName)).toBeInTheDocument();
    expect(screen.getByText(foobar)).toBeInTheDocument();
  });
  it("does not provide optional props if instructed not to.", () => {
    const { userName, foobar } = generateProps(
      path.join(__dirname, "./optional.jsx"),
      { optional: false }
    );

    expect(foobar).toBeUndefined();
  });
});
