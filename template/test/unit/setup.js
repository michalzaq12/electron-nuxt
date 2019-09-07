/* eslint no-eval: 0 */
const path = require('path')
const hooks = require('require-extension-hooks')
const env = require('browser-env')

const resourcesPathProvider = require('../../.electron-nuxt/resources-path-provider')
global.__resources = eval(resourcesPathProvider.nuxtServer())

env()
hooks('vue').plugin('vue').push()
hooks(['vue', 'js']).exclude(
  ({ filename }) => filename.match(/\/node_modules\//) || filename.includes('alias.js')
)
  .plugin('babel', {
    plugins: [
      [
        'babel-plugin-webpack-alias-7',
        {
          config: path.join(__dirname, 'alias.js').replace(/\\/g, '/')
        }
      ]
    ]
  }).push()
