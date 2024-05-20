module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/src/setUpTests.ts',
    'dummyData.ts',
    'types.ts',
    'models.ts',
    '^.+\\.(d.ts)$',
  ],
  testMatch: ['<rootDir>/src/**/?(*.)(test|spec).{js,jsx,ts,tsx}'],
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 60,
      functions: 60,
      lines: 70,
    },
  },
  timers: 'modern',
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  transform: {
    '^.+\\.svg$': '<rootDir>/node_modules/@clover-microapp/app-scripts/config/jest/fileTransform.js',
    '^.+\\.css$': '<rootDir>/node_modules/@clover-microapp/app-scripts/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)':
      '<rootDir>/node_modules/@clover-microapp/app-scripts/config/jest/fileTransform.js',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    // Makes it so that `@import styles from './styles'` works
    // `className={styles.className} => className="className"` during tests
    '^.+\\.(css|scss)$': 'identity-obj-proxy',

    // Fallback for loading any other src files. Ignores src/@types directory and any other directories that start with '@'
    '^src/(?!@)(.*)': '<rootDir>/src/$1',
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName: 'test-results-jest.xml',
        classNameTemplate: '',
        ancestorSeparator: ' - ',
      },
    ],
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testURL: 'https://www.clover.com//MICROAPP_SAFE_NAME',
  testResultsProcessor: 'jest-sonar-reporter',
};
