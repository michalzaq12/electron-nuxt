module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  globals: {
    __resources: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    {{#if_eq eslintConfig 'standard'}}'standard',{{/if_eq}}
    {{#if_eq eslintConfig 'airbnb'}}'airbnb-base',{{/if_eq}}
    "plugin:vue/recommended",
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // StandardJS — The Rules
    "indent": ["error", 2], // 2 spaces – for indentation
    "max-len": ["error", { "code": 120}],
    "no-console": "off",
    "import/no-extraneous-dependencies": "off",

    "global-require": 0,
    'import/no-unresolved': 0,
    'import/newline-after-import': 0,
    'no-underscore-dangle': 0,

    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

    "vue/max-attributes-per-line": "off",
  }
}
