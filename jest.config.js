module.exports = {
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
  coverageReporters: ['html-spa', 'lcov'],
  collectCoverageFrom: ['src/rules/**/*.ts'],
};
