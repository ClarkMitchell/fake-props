import { render, screen } from "@testing-library/react";
import generateProps from "./index";
import path from "path";

describe("fake-props", () => {
  it("generates consistent data when passed an identical seed.", () => {
    const component = path.join(
      __dirname,
      "./components/greeting/greeting.jsx"
    );
    const firstProps = generateProps(component, { seed: 123 });
    const secondProps = generateProps(component, { seed: 123 });

    for (const propName in firstProps) {
      expect(firstProps[propName]).toEqual(secondProps[propName]);
    }
  });
});
