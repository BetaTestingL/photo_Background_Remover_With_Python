module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'playwright'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:playwright/recommended',
    'prettier'
  ],
  env: {
    node: true,
    es2022: true
  },
  rules: {
    // Add project‑specific rules here
  },
  overrides: [
    {
      files: ['tests/**/*.ts'],
      env: {
        'jest/globals': true
      }
    }
  ]
};
===END===