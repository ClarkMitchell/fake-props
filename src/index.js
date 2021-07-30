import faker from "faker";
import fs from "fs";
import * as reactDocs from "react-docgen";

const defaultNamespaces = Object.freeze([
  "address",
  "animal",
  "commerce",
  "company",
  "database",
  "date",
  "finance",
  "git",
  "hacker",
  "helpers",
  "image",
  "internet",
  "lorem",
  "mersenne",
  "music",
  "name",
  "phone",
  "system",
  "time",
  "vehicle",
]);

/**
 * Generates a props object using data from Faker.js for the propTypes of a React component.
 * Props which have names that match a Faker.js method will use data from that method.
 * Otherwise a default datatype method will be used based on the propType's type.
 * In case of method name collisions, or to reduce computation, a namespaces array can be provided.
 * Instead of the default namespaces, only these will be checked for matching methods.
 * Additionally, a seed value can be passed in order to generate consistent values.
 *
 * @param {Object} path - Absolute path to component to generate props for.
 * @param {Object} options - An optional options object.
 * @param {boolean} options.optional - Whether to generate optional props.
 * @param {array} options.namespaces - An array of Faker.js namespaces to search for matching methods.
 * @param {number} options.seed - A string or number value to generate consistent values.
 * @returns - A Props Object.
 */
export default function generateProps(
  path,
  options = { optional: true, namespaces: null, seed: null }
) {
  if (options.seed) {
    faker.seed(options.seed);
  }

  const componentInfoArray = reactDocs.parse(
    fs.readFileSync(path),
    reactDocs.resolver.findAllComponentDefinitions,
    null,
    { filename: path }
  );

  return componentInfoArray.length === 1
    ? generate(componentInfoArray[0].props)
    : componentInfoArray.map((component) =>
        component?.props ? generate(component.props) : null
      );

  function generate(props) {
    const fakeProps = {};

    for (const [propName, propType] of Object.entries(props)) {
      if (!propType.required && !options.optional) {
        continue;
      }

      if (props?.name === "arrayOf") {
        return Array.from({ length: 3 }, () => generate(props.value));
      }

      if (props?.name === "shape") {
        return generate(props.value);
      }

      if (propType?.type?.name === "arrayOf") {
        const next =
          propType.type.value?.name === "shape"
            ? propType.type.value.value
            : propType.type.value;
        fakeProps[propName] = Array.from({ length: 3 }, () => generate(next));
        continue;
      }

      if (propType?.type?.name === "shape") {
        fakeProps[propName] = generate(propType.type.value);
        continue;
      }

      if (propType?.name === "arrayOf") {
        fakeProps[propName] = Array.from({ length: 3 }, () =>
          generate(propType.value)
        );
        continue;
      }

      if (propType?.name === "shape") {
        fakeProps[propName] = generate(propType.value);
        continue;
      }

      let fallbackType = propType?.type?.name || propType.name;
      if (fallbackType === "bool") {
        fallbackType = "boolean";
      }

      const matches = (options.namespaces || defaultNamespaces).filter(
        (namespace) => !!faker[namespace][propName]
      );

      try {
        fakeProps[propName] =
          matches.length === 1
            ? faker[matches[0]][propName]()
            : faker.datatype[fallbackType]();
      } catch {
        console.error(
          "Could not generate data for the following props: ",
          props
        );
      }
    }
    return fakeProps;
  }
}
