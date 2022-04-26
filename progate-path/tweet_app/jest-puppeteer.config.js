/* eslint-env node */
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  server: {
    command:
      "PORT=4444 ts-node -r tsconfig-paths/register --transpile-only src/test-server.ts",
    port: 4444,
    launchTimeout: 30000,
  },
  browserContext: "incognito",
};
