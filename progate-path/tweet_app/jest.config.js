/* eslint-env node */
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "jest-puppeteer",
  reporters: ["default", "<rootDir>/.progate/jest-reporter.js"],
  transform: {
    "^.+\\.[t|j]sx?$": "ts-jest",
  },
  globals: {
    URL: "http://localhost:4444",
    "ts-jest": {
      tsconfig: "tsconfig.test.json",
    },
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  watchman: false,
};
