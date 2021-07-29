import React from "react";
import Nested from "./nested";
import { render, screen } from "@testing-library/react";
import generateProps from "../../index";
import path from "path";

describe("fake-props", () => {
  it("can generate props for a component an object prop.", () => {
    const { firstName, address } = generateProps(
      path.join(__dirname, "./nested.jsx")
    );
    render(<Nested firstName={firstName} address={address} />);

    expect(screen.getByText(firstName)).toBeInTheDocument();
    expect(
      screen.getByText(address.streetAddress, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(address.cityName, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(address.zipCode, { exact: false })
    ).toBeInTheDocument();
  });
});
