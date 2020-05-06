/* eslint no-param-reassign: 0 */
process.env.BABEL_ENV = 'renderer'
const isProduction = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'
const path = require('path')
const webpack = require('webpack')
const deepmerge = require('deepmerge')
const nodeExternals = require('webpack-node-externals')
const resourcesPath = require('../resources-path-provider')
const { RENDERER_PROCESS_DIR, DIST_DIR, DISABLE_BABEL_LOADER } = require('../config')
const userNuxtConfig = require('../../src/renderer/nuxt.config')

const baseConfig = {
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
    { ssr: true, src: path.join(__dirname, 'resources-plugin.js') }
  ]
};

const baseExtend = (config, { isClient }) => {
  config.externals = [nodeExternals({
    modulesFromFile: {
      include: ['dependencies']
    }
  })]

  config.target = 'electron-renderer'

  // exclude browser field resolution
  const mainFields = ['esnext', 'main'];
  config.resolve.mainFields = mainFields;
  config.resolve.aliasFields = mainFields;

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

  config.module = config.module || {}
  config.module.rules = config.module.rules || []

  if (DISABLE_BABEL_LOADER) {
    // https://github.com/nuxt/typescript/blob/master/packages/typescript-build/src/index.ts#L55
    const jsLoader = config.module.rules.find(el => el.test.test('sample.js') === true)
    if (jsLoader) jsLoader.use = [path.join(__dirname, 'do-nothing-loader.js')]
  }

  // https://github.com/smt116/node-native-ext-loader#basepath-default-
  const basePathToNativeModules = isProduction ? ['_nuxt'] : []
  config.module.rules.push(
    {
      test: /\.node$/,
      loader: 'native-ext-loader',
      options: {
        basePath: basePathToNativeModules
      }
    }
  )

}

const mergeConfig = customConfig => {
  const hasExtendFunction = (customConfig.build !== undefined && customConfig.build.extend !== undefined);
  if(hasExtendFunction){
    const userExtend = customConfig.build.extend;
    customConfig.build.extend = function() {
      baseExtend(...arguments) // eslint-disable-line prefer-rest-params
      userExtend(...arguments) // eslint-disable-line prefer-rest-params
    }
  } else {
    if(baseConfig.build === undefined) baseConfig.build = {};
    baseConfig.build.extend = baseExtend;
  }
  return deepmerge(baseConfig, customConfig);
}


module.exports = mergeConfig(userNuxtConfig);
module.exports.mergeConfig = mergeConfig;
module.exports.baseConfig = baseConfig;
