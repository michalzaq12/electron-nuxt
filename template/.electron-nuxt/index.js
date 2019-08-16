const path = require('path');
const { Pipeline, Logger } = require('@xpda-dev/core');
const {ElectronLauncher} = require('@xpda-dev/electron-launcher');
const {ElectronBuilder} = require('@xpda-dev/electron-builder');
const {Webpack} = require('@xpda-dev/webpack-step');
const NuxtApp = require('./renderer/NuxtApp');
const { DIST_DIR, MAIN_PROCESS_DIR } = require('./config')


const isDev = process.env.NODE_ENV === 'development'

const launcher = new ElectronLauncher({
  entryFile: path.join(DIST_DIR, 'index.js'),
})

const builder = new ElectronBuilder({
  builderOptions: path.join(__dirname, '../builder.config.js')
})

const webpackConfig = Webpack.getBaseConfig({
  entry: isDev
    ? path.join(MAIN_PROCESS_DIR, 'index.dev.js')
    : path.join(MAIN_PROCESS_DIR, 'index.js'),
  output: {
    filename: 'index.js',
    path: DIST_DIR,
  },
})

const webpackMain = new Webpack({
  webpackConfig: webpackConfig,
  launcher: launcher,
})

const nuxt = new NuxtApp(new Logger('Nuxt', 'green'));


const pipe = new Pipeline({
  title: 'Electron-nuxt',
  isDevelopment: isDev,
  steps: [webpackMain, nuxt],
  launcher: launcher,
  builder: builder
})

pipe.run()
