# {{ name }}

> {{ description }}

#### Build Setup

``` bash
# install dependencies
yarn install

# serve app with hot reload
yarn run dev

# build electron application for production
yarn run build

{{#or unit e2e}}
# yarn tests
yarn test

{{/or}}

{{#if eslint}}
# lint all JS/Vue component files in `src/`
yarn run lint

{{/if}}
```

---

This project was generated with [electron-nuxt](https://github.com/michalzaq12/electron-nuxt) v{{templateVersion}} using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://github.com/michalzaq12/electron-nuxt/blob/master/README.md).
