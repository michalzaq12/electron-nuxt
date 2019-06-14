

<div align="center">
<br>
<img width="350" src="./docs/images/electron-nuxt.png" alt="electron-nuxt">
<br>
<br>
</div>

<div align="center">

[![Windows Build status](http://badges.herokuapp.com/travis/michalzaq12/electron-nuxt?env=BADGE=windows&label=Windows&style=for-the-badge&branch=master)](https://travis-ci.org/michalzaq12/electron-nuxt)
[![Linux Build status](http://badges.herokuapp.com/travis/michalzaq12/electron-nuxt?env=BADGE=linux&label=Linux&style=for-the-badge&branch=master)](https://travis-ci.org/michalzaq12/electron-nuxt)
[![OSX Build status](http://badges.herokuapp.com/travis/michalzaq12/electron-nuxt?env=BADGE=osx&label=Mac&style=for-the-badge&branch=master)](https://travis-ci.org/michalzaq12/electron-nuxt)

</div>

<div align="center">

[![Snoop Lion](https://forthebadge.com/images/badges/made-with-javascript.svg)]()
[![Snoop Lion](https://forthebadge.com/images/badges/for-you.svg)]()

</div>

<br>

## Overview

The boilerplate for making electron applications built with vue / nuxt.

Things you'll find in this boilerplate...

* Auto-updating server for easy development \*
* ES6/ES7 compilation without any extra work \*
* Parallel build main and renderer
* Installed newest [vue-devtools](https://github.com/vuejs/vue-devtools)
* Ability to easily package your electron app using [electron-builder](https://github.com/electron-userland/electron-builder)
* Sass / LESS / Stylus pre - processors \**
* ESLint \([`standard`](https://github.com/feross/standard) and [`airbnb-base`](https://github.com/airbnb/javascript)\) \** (TODO)
* Unit Testing \(vue-test-utils + AVA\) \**
* End-to-end Testing \(Spectron + AVA\) \** (waiting for merge [#364](https://github.com/electron/spectron/pull/364))

\* available in renderer and main process

\** customizable during vue-cli scaffolding




### Getting Started

This boilerplate was built as a template for [vue-cli v2](https://www.npmjs.com/package/vue-cli) and includes options to customize your final scaffolded app. 

#### Scaffolding

```bash
npm install -g vue-cli
vue init michalzaq12/electron-nuxt <project-name>
```

> Since version 3.0 vue-cli package name has changed from vue-cli to @vue/cli.
> If you already have instaled vue-cli >= 3, you will need to install global bridge:
>
> `npm install -g @vue/cli-init`
>
> `vue init` now works exactly the same as vue-cli@2.x

```bash
cd <project-name>
npm install
```




#### Available commands

- Run app in development
```bash
npm run dev
```
- Build your app for production 
```bash
npm run build
```

#### Migration from electron-vue

- Can`t update vue devtools: [solution](https://github.com/SimulatedGREG/electron-vue/issues/844)
- `__static` ->  `__resources`


#### Some notes about production build

- All config can be specified in `builder-config.js` file

- Due to [electron-builder](https://github.com/electron-userland/electron-builder) the distinction between `dependencies` and `devDependencies` is very important. Incorrect assignment can cause the package to grow by several MB.

    **Brief advice:** Try to avoid adding a package to `dependencies`.

    
    **Explanation**
    
    > If your package uses some modules only for build, test, or bundles them into a dist file (i.e. what will be used by the consumer project), then those modules should not be mentioned in dependencies. We still list them in devDependencies for development. [~ghybs](https://stackoverflow.com/a/50803712)

    - packages mentioned in `dependencies` are packed into production build with all subdependencies *(this behavior can`t be configured)*.

    - packages mentioned in `devDependencies` aren`t packed into production build. 

    In conclusion, we need to pack the necessary dependencies to production build, but without subpackages, dead code, develompent tools and for example stylus files (we can compile them to css). To do this we use Webpack, which produce dist files (our entire application) and only these files will be copied (files are explicitly specified in `builder-config.js`) to production build.

    **Some `dependencies` use case**

    - node native addon
    - package that contains files that **can`t** or *should not* be bundled by webpack (eg. **binary data**, **images**, *some already minified scripts*)







# Development notes

### Updating nuxt.js
https://nuxtjs.org/guide/release-notes/#v2.6.0