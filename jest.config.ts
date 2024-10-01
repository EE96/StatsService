export default {
  // Specifies the test environment
  testEnvironment: 'node',

  // A preset that sets up an environment for testing TypeScript code
  preset: 'ts-jest',

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // A map from regular expressions to paths to transformers. This tells Jest to use ts-jest for transforming TypeScript files
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  // An array of file extensions your modules use
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],

  // Path to ignore during testing
  testPathIgnorePatterns: ['/node_modules/', '/dist/', ".build"],

  // Coverage collection from specific directories
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],

  // Specifies where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // Use this option to add custom reporters
  reporters: ['default', 'jest-junit'],

  // Automatically reset mock state before every test
  resetMocks: true,

  // Enable verbose test result output
  verbose: true,
};