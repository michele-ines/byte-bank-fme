// jest.config.ts
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  coverageProvider: 'v8',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
    '^app/(.*)$': '<rootDir>/src/app/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^interfaces/(.*)$': '<rootDir>/src/interfaces/$1',
    '^store/(.*)$': '<rootDir>/src/store/$1',
    '^mocks/(.*)$': '<rootDir>/src/mocks/$1',
    '\\.(css|scss|sass)$': 'identity-obj-proxy'
  },

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },

  transformIgnorePatterns: [
    '/node_modules/',
    '\\.pnp\\.[^\\/]+$'
  ],
};

export default config;
