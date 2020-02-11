---
sidebar: auto
---

# Getting Started

This boilerplate was built as a template for [vue-cli v2](https://github.com/vuejs/vue-cli/tree/v2) and includes options to customize your final scaffolded app.

## Requirements

Since template use *vue-cli* we need to install it: 

```
npm install -g vue-cli
```

::: warning
If you already have installed @vue/cli, you will only need to install:

`npm install -g @vue/cli-init` 
:::

## Scaffolding

```
vue init michalzaq12/electron-nuxt <project-name>
cd <project-name>
yarn install
```

::: warning
We currently recommend using *Yarn* instead of *npm* because *npm* fails to generate the correct dependency tree in some template cases.
:::

## Available commands

|Command|Description|
|--|---|
|`yarn run dev`| :rocket: Run app in development |
|`yarn run build`| :computer: Build your app for production |
|`yarn run test:unit`| Run unit tests |
|`yarn run test:e2e`| Run end-to-end tests |
|`yarn run tests`| Run all tests | 




