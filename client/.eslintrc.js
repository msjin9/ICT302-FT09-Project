module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:vue/vue3-essential',
    'plugin:jest/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  plugins: ['jest', 'import'],
  settings: {
    'import/resolver': {
      webpack: {
        config: require.resolve('@vue/cli-service/webpack.config.js'),
      },
    },
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        vue: 'never',
      },
    ],
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
      },
    ],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint',
  },
};
