import React from "react";
import Greeting from "./greeting";
import { render, screen } from "@testing-library/react";
import generateProps from "../../index";
import path from "path";

describe("fake-props", () => {
  it("returns an object corresponding to a react component's propTypes", () => {
    const props = generateProps(path.join(__dirname, "./greeting.jsx"));
    render(<Greeting {...props} />);

    expect(screen.getByText(props[Object.keys(props)[0]])).toBeInTheDocument();
    expect(screen.getByText(props[Object.keys(props)[1]])).toBeInTheDocument();
  });
});
