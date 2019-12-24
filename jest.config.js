module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  modulePaths: ["<rootDir>"],
  moduleDirectories: ['<rootDir>/node_modules', '<rootDir>/src'],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "<rootDir>/__mocks__/styles.js"
  },
}