module.exports = {
  env: { browser: true },
  parser: 'babel-eslint',
  extends: 'airbnb',
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'react/no-array-index-key': 1,
    'jsx-a11y/click-events-have-key-events': 1,
    'import/prefer-default-export': 1,
    'jsx-a11y/anchor-is-valid': [ 2, {
      'components': [ 'Link' ],
      'specialLink': [ 'to' ]
    }],
    'no-unused-expressions': [2, { "allowShortCircuit": true }],
    'func-names': [2, 'never']
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      }
    }
  }
};