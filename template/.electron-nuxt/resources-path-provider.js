const path = require('path');

const RESOURCES_DIR_PATH = path.join(__dirname, '..', 'src', 'resources').replace(/\\/g, '/');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {

    mainProcess() {
        return isProduction ? mainProcessProduction() : processDev();
    },

    renderedProcess() {
        return isProduction ? rendererProcessProduction() : processDev();
    }

}

function processDev (){
    //resolve during compilation
    return `
    global.__resources = \`${RESOURCES_DIR_PATH}\`;
  `;
}

function rendererProcessProduction() {
    //resolve on runtime
    //path depends on production directory structure

    //renderer entry: ./dist/renderer/_nuxt/app.js
    //resources: ./resources/
    return `
    global.__resources = require('path').join(__dirname, '..', '..', 'resources');
  `;
}

function mainProcessProduction() {
    //resolve on runtime
    //path depends on production directory structure

    //main entry: ./dist/main/index.js
    //resources: ./resources/
    return `
    global.__resources = require('path').join(__dirname, '..', 'resources');
  `;
}