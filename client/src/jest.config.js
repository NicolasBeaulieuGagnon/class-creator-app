const config = {
  roots: ['<rootDir>/src'],
  collectCoverage: true,

  // jsdom for client repos
  // node for api, lib repos
  testEnvironment: 'node',

  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },

  coverageDirectory: '__coverage__',
  coverageReporters: ['text', 'lcov'],

  reporters: [
    'default',
    // For gitlab publish
    [
      'jest-junit',
      {
        outputDirectory: '__tests__',
        outputName: 'junit.xml',
        usePathForSuiteName: true,
      },
    ],
    // for sonar
    [
      'jest-sonar',
      {
        outputDirectory: '__tests__',
      },
    ],
  ],
};

/*
  The following options accelerate tests execution time. These options should be set as environment variables.
  DISABLE_UNIT_TESTS_TYPE_CHECKING = true
    isolatedModules is an option that turn off type checking when compile with ts-jest.
    The performance gain is major
  
  SKIP_UNIT_TESTS_COVERAGE = true
    Collect code coverage is also an expensive option.
   */

if (process.env.DISABLE_UNIT_TESTS_TYPE_CHECKING === 'true') {
  config.globals = {
    'ts-jest': {
      isolatedModules: true,
    },
  };
}

if (process.env.SKIP_UNIT_TESTS_COVERAGE === 'true') {
  config.collectCoverage = false;
}
module.exports = config;
