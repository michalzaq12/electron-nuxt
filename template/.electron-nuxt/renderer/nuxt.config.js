/* eslint no-param-reassign: 0 */
process.env.BABEL_ENV = 'renderer'
const isProduction = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'
const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const resourcesPath = require('../resources-path-provider')
const { RENDERER_PROCESS_DIR, DIST_DIR } = require('../config')

const userNuxtConfig = require('../../src/renderer/nuxt.config')

module.exports = {
  ...userNuxtConfig,
  srcDir: RENDERER_PROCESS_DIR,
  rootDir: RENDERER_PROCESS_DIR,
  router: {
    mode: 'hash'
  },
  dev: isDev,
  generate: {
    dir: path.join(DIST_DIR, 'renderer')
  },
  plugins: [
    { ssr: true, src: path.join(__dirname, 'resources-plugin.js') },
    ...(userNuxtConfig.plugins || [])
  ],
  build: {
    extend (config, { isClient }) {
      if (userNuxtConfig.build !== undefined && userNuxtConfig.build.extend !== undefined) {
        userNuxtConfig.build.extend(...arguments) // eslint-disable-line prefer-rest-params
      }

      config.externals = [nodeExternals({
        modulesFromFile: {
          include: ['dependencies']
        }
      })]

      config.target = 'electron-renderer'

      config.node = {
        __dirname: !isProduction,
        __filename: !isProduction
      }

      if (!isDev) {
        // absolute path to files on production (default value: '/_nuxt/')
        config.output.publicPath = '_nuxt/'
      }

      config.plugins.push(
        new webpack.DefinePlugin({
          INCLUDE_RESOURCES_PATH: isClient ? resourcesPath.nuxtClient() : resourcesPath.nuxtServer()
        })
      )
    }
  }
}
