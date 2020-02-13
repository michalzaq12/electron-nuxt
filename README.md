

<div align="center">
<br>
<img width="350" src="./docs/.vuepress/images/electron-nuxt.png" alt="electron-nuxt">
<br>
<br>
</div>

<div align="center">

[![Windows Build status](http://badges.herokuapp.com/travis/michalzaq12/electron-nuxt?env=BADGE=windows&label=Windows&style=for-the-badge&branch=master)](https://travis-ci.org/michalzaq12/electron-nuxt)
[![Linux Build status](http://badges.herokuapp.com/travis/michalzaq12/electron-nuxt?env=BADGE=linux&label=Linux&style=for-the-badge&branch=master)](https://travis-ci.org/michalzaq12/electron-nuxt)
[![OSX Build status](http://badges.herokuapp.com/travis/michalzaq12/electron-nuxt?env=BADGE=osx&label=Mac&style=for-the-badge&branch=master)](https://travis-ci.org/michalzaq12/electron-nuxt)

</div>

<div align="center">

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=for-the-badge&color=yellow)](https://standardjs.com)
[![Code quality](https://img.shields.io/codefactor/grade/github/michalzaq12/electron-nuxt.svg?style=for-the-badge)](https://www.codefactor.io/repository/github/michalzaq12/electron-nuxt)

![Template version](https://img.shields.io/github/package-json/version/michalzaq12/electron-nuxt.svg?label=TEMPLATE%20VERSION&style=for-the-badge)

</div>

<br>

## Overview

The boilerplate for making electron applications built with vue / nuxt.

**Currently runs with:**

- Electron **v8.0.0**
- Electron Builder **v22.0.0**
- Vue **v2.0.0**
- Nuxt **v2.0.0**

**Things you'll find in this boilerplate:**

* Auto-updating for easy development \*
* ES6/ES7 compilation without any extra work \*
* Typescript support [WIP](only in renderer process for now)
* Parallel code compilation
* Installed latest [vue-devtools](https://github.com/vuejs/vue-devtools)
* Ability to easily package your electron app using [electron-builder](https://github.com/electron-userland/electron-builder)
* Configured ESLint ([`standard`](https://github.com/feross/standard) code style) with support for typescript linting\**
* Built-in support for CSS pre-processor: \**
    * Sass (scss)
    * LESS
    * Stylus
* Pre-installed UI components framework: \**
    * [Buefy](https://buefy.org)
    * [Vuetify](https://vuetifyjs.com/en/)
    * [Element](https://element.eleme.io/#/en-US)
* Pre-installed icon set for offline usage: \**
    * [Font Awesome 5](https://fontawesome.com/icons)
    * [Material Design Icon](https://materialdesignicons.com)
* Unit Testing \([vue-test-utils](https://vue-test-utils.vuejs.org) + [AVA](https://github.com/avajs/ava)\) \**
* End-to-end Testing \([Spectron](https://github.com/electron/spectron) + [AVA](https://github.com/avajs/ava)\) \** 

\* available in renderer and main process <br>
\** customizable during vue-cli scaffolding



## Getting Started

```bash
# Install vue-cli and scaffold boilerplate
npm install -g vue-cli
vue init michalzaq12/electron-nuxt <project-name>

# Install dependencies and run your app
cd <project-name>
yarn install
yarn run dev 
```

**Take a look at the [documentation](https://michalzaq12.github.io/electron-nuxt/). Here you will find useful information about configuration, project structure, and building your app**


## Made with electron-nuxt

* [**NKNxVault**](https://vault.nknx.org): A NKN desktop wallet for all platforms
* [**Reflex**](https://reflexapp.nickwittwer.com): A responsive web browser for Mac
