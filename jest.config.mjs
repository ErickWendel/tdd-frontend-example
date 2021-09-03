/*
 */
export default {
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  restoreMocks: true,
  coverageReporters: [
    "text",
    "lcov",
  ],
  collectCoverageFrom : ["src/**/*.js", "!src/**/index.js"],
  testEnvironment: "jsdom",
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  watchPathIgnorePatterns: [
    "node_modules"
  ],
  transformIgnorePatterns: [ "node_modules" ]
};
