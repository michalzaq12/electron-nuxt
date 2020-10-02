

<div align="center">
<br>
<img width="350" src="./docs/.vuepress/images/electron-nuxt.png" alt="electron-nuxt">
<br>
<br>
</div>

<div align="center">

[![Windows Build status](https://img.shields.io/github/workflow/status/michalzaq12/electron-nuxt/os-windows?label=WINDOWS&style=for-the-badge)](https://github.com/michalzaq12/electron-nuxt/actions)
[![Linux Build status](https://img.shields.io/github/workflow/status/michalzaq12/electron-nuxt/os-linux?label=LINUX&style=for-the-badge)](https://github.com/michalzaq12/electron-nuxt/actions)
[![OSX Build status](https://img.shields.io/github/workflow/status/michalzaq12/electron-nuxt/os-mac?label=MACOS&style=for-the-badge)](https://github.com/michalzaq12/electron-nuxt/actions)

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

- Electron **v8**
- Electron Builder **v22**
- Vue **v2**
- Nuxt **v2**

**Things you'll find in this boilerplate:**

* Auto-updating for easy development \*
* ES6/ES7 compilation without any extra work \*
* Typescript support [WIP](only in renderer process for now)
* Parallel code compilation
* Installed latest [vue-devtools](https://github.com/vuejs/vue-devtools)
* Ability to easily package your electron app using [electron-builder](https://github.com/electron-userland/electron-builder)
* [GitHub Action](https://github.com/michalzaq12/action-electron-nuxt) for releasing cross-platform apps (>1.6.0)
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

* [**NKNxVault**](https://vault.nknx.org): NKN desktop wallet (https://github.com/nknx-org/nknx-vault)
* [**Reflex**](https://reflexapp.nickwittwer.com): Responsive web browser for developers (https://github.com/nwittwer/reflex)
* **BinaryBotPlayground**: An Electron app for loading and running Binary bots (https://github.com/gabriellanzer/BinaryBotPlayground)
* **system-companion**: Multi platform app for getting system information (https://github.com/romslf/system-companion)
* **NSMultiTools**: Graphical interface to make life easier for Nintendo Switch hackers (https://github.com/MeatReed/NSMultiTools)
* **blue-burlap**: CI/CD For Salesforce Deployments (https://github.com/fuzzybaird/blue-burlap)
* [**cuesync**](https://cuesync.pro/): Synchronize cues between Algoriddim Djay, Serato DJ Lite/Pro and Virtual DJ (https://github.com/schneefux/cuesync)
* **VKGram**: Messenger for VK that allows you to send custom stickers (https://github.com/PurpleHorrorRus/VKGram)
