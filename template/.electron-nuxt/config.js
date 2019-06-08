const path = require('path');

const RESOURCES_DIR_PATH = path.join(__dirname, '..', 'resources').replace(/\\/g, '/');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  ELECTRON_RELAUNCH_CODE: 9888,
  SERVER_PORT: 9080,

  resourcesPath: {
    mainProcess() {
      return isDev ? processDev() : mainProcessProduction();
    },

    renderedProcess() {
      return isDev ? processDev() : rendererProcessProduction();
    }
  }
};


function processDev (){
  //resolve during compilation
  return `
    global.__resources = \`${RESOURCES_DIR_PATH}\`;
  `;
}

function rendererProcessProduction() {
  //resolve on runtime
  //path depends on production directory structure

  //renderer entry: ./renderer/_nuxt/app.js
  //resources: ./resources/
  return `
    global.__resources = require('path').join(__dirname, '..', '..', 'resources');
  `;
}

function mainProcessProduction() {
  //resolve on runtime
  //path depends on production directory structure
  
  //main entry: ./main/index.js
  //resources: ./resources/
  return `
    global.__resources = require('path').join(__dirname, '..', 'resources');
  `;
}