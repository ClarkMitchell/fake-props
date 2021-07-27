import Greeting from "~/components/greeting/greeting";
import { render, screen } from "@testing-library/react";
import generateProps from "./index";

describe("fake-props", () => {
  it("generates consistent data when passed an identical seed.", () => {
    const firstProps = generateProps(Greeting, null, 123);
    const secondProps = generateProps(Greeting, null, 123);

    for (const propName in firstProps) {
      expect(firstProps[propName]).toEqual(secondProps[propName]);
    }
  });
});
