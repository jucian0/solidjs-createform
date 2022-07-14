export default {
   clearMocks: true,
   coverageDirectory: 'coverage',
   transform: {
      '^.+\\.(ts|tsx|js|jsx)?$': 'ts-jest'
   },
   testRegex: '(/tests/.*|\\.(test|spec))\\.(ts|tsx)$',
   moduleFileExtensions: ['ts', 'tsx', 'js'],
   collectCoverageFrom: ['src/**/*.{ts,tsx}'],
   coveragePathIgnorePatterns: ['/node_modules/', '/src/index.ts']
}
