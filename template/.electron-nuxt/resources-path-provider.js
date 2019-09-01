const { RESOURCES_DIR } = require('./config')

const RESOURCES_DIR_PATH = RESOURCES_DIR.replace(/\\/g, '/')

const isProduction = process.env.NODE_ENV === 'production'

function staticPath () {
  // resolve during compilation
  return `
    global.__resources = \`${RESOURCES_DIR_PATH}\`;
  `
}

function pathFromRendererOnRuntime () {
  // resolve on runtime
  // path depends on production directory structure

  // renderer entry: ./dist/renderer/index.html
  // resources: ./dist/resources/
  return `
    global.__resources = require('path').join(__dirname, '..', 'resources');
  `
}

function pathFromMainOnRuntime () {
  // resolve on runtime
  // path depends on production directory structure

  // main entry: ./dist/main/index.js
  // resources: ./dist/resources/
  return `
    global.__resources = require('path').join(__dirname, '..', 'resources');
  `
}

module.exports = {

  mainProcess () {
    return isProduction ? pathFromMainOnRuntime() : staticPath()
  },

  nuxtClient () {
    return isProduction ? pathFromRendererOnRuntime() : staticPath()
  },

  nuxtServer: staticPath
}
