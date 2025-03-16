module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^#model(.*)$': '<rootDir>/src/model$1',
    '^#state(.*)$': '<rootDir>/src/state$1',
    '^#ui(.*)$': '<rootDir>/src/ui$1',
    '^#hooks(.*)$': '<rootDir>/src/hooks$1',
    '^#structure(.*)$': '<rootDir>/src/structure$1',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
