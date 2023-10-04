const esModules = ["slick-carousel"].join("|");

module.exports = {
  collectCoverage: true,
  coverageProvider: "v8",
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!<rootDir>/out/**",
    "!<rootDir>/.next/**",
    "!<rootDir>/*.config.js",
    "!<rootDir>/coverage/**",
  ],
  preset: "ts-jest",
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^@/src/(.*)": "<rootDir>/src/$1",
    "^@/app/(.*)": "<rootDir>/app/$1",
    "^@/components/(.*)": "<rootDir>/src/components/$1",
    "^@/services/(.*)": "<rootDir>/src/services/$1",
    "^@/types/(.*)": "<rootDir>/src/types/$1",
    "^@/utils/(.*)": "<rootDir>/src/utils/$1",
    "^@/hooks/(.*)": "<rootDir>/src/hooks/$1",
    "^@/styles/(.*)": "<rootDir>/__styles__/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
    "^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
    "/node_modules/slick-carousel/slick/slick.css",
    `/node_modules/(?!${esModules})`,
  ],
  setupFilesAfterEnv: ["<rootDir>/test-setup.js"],
};
