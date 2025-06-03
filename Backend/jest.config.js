const { presets } = require("./babel.config");

module.exports = {
  preset:'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  testMatch: ['**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest', // supporte .js, .jsx, .ts, .tsx
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@babel/runtime|mongoose|mongodb)/)',
    '/node_modules/(?!.pnpm/mongodb)', 
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
};
