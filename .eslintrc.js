module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true,
    },
  },
  plugins: ['react'],
  extends: ['prettier', 'airbnb', 'plugin:react/recommended'],
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'arrow-parens': 'as-needed',
  },
};
