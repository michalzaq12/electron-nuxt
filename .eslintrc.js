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
    sourceType: 'module'
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
  ],
  rules: {
    "indent": ["error", 2], // 2 spaces – for indentation
    "max-len": ["error", { "code": 120}],
    "no-console": "off",
    "arrow-parens": ["error", "as-needed"],
    "curly": ["error", "multi-line"],
    "import/no-extraneous-dependencies": "off",
    "require-await": 0,
    
    // /src/renderer/plugins/vuetify.js imports fonts for offline use. eslint detects these as "unused-expressions".
    "no-unused-expressions": "off",

    "global-require": 0,
    'import/no-unresolved': 0,
    'import/newline-after-import': 0,
    'no-underscore-dangle': 0,

    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

    "vue/max-attributes-per-line": "off",
    "vue/singleline-html-element-content-newline" : 0
  }
}
