export default {
  setupFilesAfterEnv: ["./jest.setup.js"],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironment: "jsdom",
};
