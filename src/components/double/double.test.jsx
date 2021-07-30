import React from "react";
import Outer from "./double";
import { render, screen } from "@testing-library/react";
import generateProps from "../../index";
import path from "path";

describe("fake-props", () => {
  it("returns an object corresponding to a react component's propTypes", () => {
    const [outerProps] = generateProps(path.join(__dirname, "./double.jsx"));

    render(<Outer {...outerProps} />);

    expect(screen.getByText(outerProps.firstName)).toBeInTheDocument();
    expect(screen.getByText(outerProps.lastName)).toBeInTheDocument();
  });
});
