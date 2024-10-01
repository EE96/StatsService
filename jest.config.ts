export default {
  testEnvironment: 'node',

  preset: 'ts-jest',

  clearMocks: true,

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],

  testPathIgnorePatterns: ['/node_modules/', '/dist/', ".build"],

  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],

  coverageDirectory: 'coverage',

  reporters: ['default', 'jest-junit'],

  resetMocks: true,

  verbose: true,
};