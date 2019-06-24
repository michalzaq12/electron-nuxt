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
        "eslint:recommended",
        "airbnb",
        "plugin:vue/recommended",
    ],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // add your custom rules here
    rules: {
        "indent": ["error", 4],
        "no-console": "off",
        "import/no-extraneous-dependencies": "off",

        "global-require": 0,
        'import/no-unresolved': 0,
        'no-param-reassign': 0,
        'no-shadow': 0,
        'import/extensions': 0,
        'import/newline-after-import': 0,
        'no-multi-assign': 0,

        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

        "vue/max-attributes-per-line": "off",
    }
}