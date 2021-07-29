# Fake Props

`fake-props` generates test props with [Faker.js](https://github.com/marak/Faker.js/) data based on React [PropTypes](https://github.com/facebook/prop-types).

If your prop name matches a Faker.js method then that will be used to generate data. For example a prop name of `userName` will be generated data with `faker.internet.userName()`.

Otherwise generic data matching the PropType data type will be generated.
I.E. a proptype of `foobar.string.isRequired` will be generated data with `faker.datatype.string()`.

## Install

```bash
npm i --save-dev fake-props
```

## Basic Usage

The `generateProps` function takes a path to a component. This is necessary since PropTypes do not expose types at runtime, so the component source file must be read.

```jsx
import React from "react";
import Greeting from "./greeting";
import { render, screen } from "@testing-library/react";
import generateProps from "../../index";
import path from "path";

test("Greeting component displays first and last name in message.", () => {
  const { firstName, lastName } = generateProps(
    path.join(__dirname, "./greeting.jsx")
  );

  render(<Greeting firstName={firstName} lastName={lastName} />);

  expect(screen.getByText(firstName)).toBeInTheDocument();
  expect(screen.getByText(lastName)).toBeInTheDocument();
});
```

## Options

The second argument to `generateProps` is an optional options object with the following default values.

```javascript
{
  optional: true,
  namespaces: null,
  seed: null,
}
```

`optional` is a boolean which can be set to false in order not to generate not-required props.

`namespaces` can be passed an array of Faker.js namespaces in which to search for functions. This may be necessary to distinguish between the `type` function in `animal`, `database`, `vehicle`, etc. This could also be set as a performance tweak for slow tests.

`seed` is a number which will cause Faker.js to produce consistent results. This may be helpful for automated pipelines where test flakiness can be problematic.
