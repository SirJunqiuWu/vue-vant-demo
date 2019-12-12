module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger':'error',
    'no-unused-vars':'off',
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
