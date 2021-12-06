---
sidebar: auto
---


# Guide

## Renderer process

### Application structure

Same as [default Nuxt.js application structure](https://nuxtjs.org/guide/directory-structure/), but without **Static Directory**. If you don't want to use Webpack assets from the `assets` directory read section [static resources](#static-resources) and [resolving paths in HTML](#resolving-paths-in-HTML).

### Routing

Nuxt.js automatically generates the vue-router configuration based on your file tree of Vue files inside the `src/renderer/pages` directory.

[Read more](https://nuxtjs.org/guide/routing/)


## Main process

Entry point: `main/index.js`

> [`BrowserWinHandler`](https://github.com/michalzaq12/electron-nuxt/blob/master/template/src/main/BrowserWinHandler.js) is helper class, which wrap [`BrowserWindow`](https://electronjs.org/docs/api/browser-window) to make it more self-manageable. This solution facilitates communication between the windows and doesn't require a window manager.

## Resolving paths in HTML

If you would like to set the src of an `<img>` to the path of an image, you must use `~/assets` Webpack alias or provide full path with **protocol**.

**Examples:**
- `<img src="~/assets/image.png" />`
- `<img src="https://example.com/image.png" />`

## Static resources

Electron-nuxt (1.7.0) improves a global variable named [`process.resourcesPath`](https://www.electronjs.org/docs/api/process#processresourcespath-readonly) that will yield a proper path to the `src/extraResources` in renderer and main process. In this directory you can store all necessary resources with reliable path to them, but **you must treat all assets in this directory as read only.** (If you need also write access, use [`app.getPath('appData')`](https://electronjs.org/docs/api/app#appgetpathname) instead).

**Use case:**
* [Tray icon](https://electronjs.org/docs/api/tray)
* External scripts
* Binary data

## Building notes

Electron-nuxt support [electron-builder](https://github.com/electron-userland/electron-builder) to build and distribute your production ready application. Further customization can be made in `builder.config.js` file.

### Electron-builder arguments (1.6.0)

Any electron-builder command line argument can by passed through`build` script.

- `package.json`: `"build": "node ./electron-nuxt/build.js --win"`
- cli: `yarn build --win` 



### Cross platform compilation (1.6.0)

[GitHub Action](https://github.com/michalzaq12/action-electron-nuxt) for building and releasing electron-nuxt apps

**Add a workflow file** to your project (e.g. `.github/workflows/build.yml`).
Using the workflow below, GitHub will build your app every time you push a commit to master branch.

See also: https://github.com/michalzaq12/action-electron-nuxt#configuration

   ```yml
   name: Build/release

   on:
     push:
       branches:
         - master

   jobs:
     release:
       runs-on: ${{ matrix.os }}

       strategy:
         matrix:
           os: [macos-latest, ubuntu-latest, windows-latest]

       steps:
         - name: Check out Git repository
           uses: actions/checkout@v1

         - name: Install Node.js, NPM and Yarn
           uses: actions/setup-node@v1
           with:
             node-version: 14

         - name: Build/release Electron app
           uses: michalzaq12/action-electron-nuxt@v1.4.4
           with:
             # GitHub token, automatically provided to the action
             # (No need to define this secret in the repo settings)
             # type: string
             github_token: ${{ secrets.github_token }}

             # If the commit is tagged with a version (e.g. "v1.0.0")
             # type: boolean
             release: ${{ startsWith(github.ref, 'refs/tags/v') }}
   ```

**If you use Travis CI this [example](https://gist.github.com/nwittwer/60aef18c9b4e9506534bdcc0e4a7c3f5) may be useful**

### `dependencies` vs `devDependencies`

Due to [electron-builder](https://github.com/electron-userland/electron-builder) the distinction between `dependencies` and `devDependencies` is very important. Incorrect assignment can cause the package to grow by several MB, the build time also increases.

**Brief advice:** Try to avoid adding a package to `dependencies`.


**Explanation**

> If your package uses some modules only for build, test, or bundles them into a dist file (i.e. what will be used by the consumer project), then those modules should not be mentioned in dependencies. We still list them in devDependencies for development. [~ghybs](https://stackoverflow.com/a/50803712)

- packages mentioned in `dependencies` are packed into production build with all sub-dependencies *(this behavior can`t be configured)*.

- packages mentioned in `devDependencies` aren`t packed into production build.

In conclusion, we need to pack the necessary dependencies to production build, but without unneeded sub-packages, dead code, development tools and for example stylus files (we can compile them to css). To do this we use Webpack, which produce dist files (our entire application) and only these files will be copied (files are explicitly specified in `builder-config.js`) to production build.

**Some `dependencies` use case**

- node native addon
- package that contains files that **can`t** or *should not* be bundled by webpack (eg. **binary data**, **images**, *some already minified scripts*)

### `__dirname` and `__filename`

Global variables `__dirname` and `__filename` are no longer reliable on production build. If you need reliable path to static assets read more about: [static resources](#static-resources).

## Testing

Electron-nuxt supports both unit testing and end-to-end testing for the renderer process. During vue-cli scaffolding you will have the option to include testing support.
