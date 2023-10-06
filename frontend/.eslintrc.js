module.exports = {
  ecmaFeatures: {
    modules: true,
    spread: true,
    restParams: true,
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['./src/**/*.js'],
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'react/jsx-props-no-spreading': 'off',
  },
};
