# {{ name }}

> {{ description }}

#### Build Setup

``` bash
# install dependencies
npm install

# serve app with hot reload
npm run dev

# build electron application for production
npm run build

{{#testing unit e2e}}
# run {{#unit}}unit{{/unit}}{{#unit}}{{#e2e}} & {{/e2e}}{{/unit}}{{#e2e}}end-to-end{{/e2e}} tests
npm test

{{/testing}}

{{#if eslint}}
# lint all JS/Vue component files in `src/`
npm run lint

{{/if}}
```

---

This project was generated with [electron-nuxt](https://github.com/michalzaq12/electron-nuxt) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://github.com/michalzaq12/electron-nuxt/blob/master/README.md).
