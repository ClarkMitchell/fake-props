import faker from "faker";
import parsePropTypes from "parse-prop-types";

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
 * @param {Object} component - The React component to generate props for.
 * @param {array} namespaces - An array of Faker.js namespaces to search for matching methods.
 * @param {number} seed - A string or number value to generate consistent values.
 * @returns - A Props Object.
 */
export default function generateProps(component, namespaces, seed) {
  if (seed) {
    faker.seed(seed);
  }

  return generate(parsePropTypes(component), namespaces);
}

function generate(propTypes, namespaces) {
  const props = {};
  for (const [propName, propType] of Object.entries(propTypes)) {
    const {
      type: { name: type },
    } = propType;

    if (type === "shape") {
      props[propName] = generate(propType.type.value, namespaces);
    } else {
      const matches = (namespaces || defaultNamespaces).filter(
        (namespace) => !!faker[namespace][propName]
      );

      props[propName] =
        matches.length === 1
          ? faker[matches[0]][propName]()
          : faker.datatype[type]();
    }
  }

  return props;
}
