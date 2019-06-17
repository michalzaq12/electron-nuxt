const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');
const SRC_ROOT =  path.join(PROJECT_ROOT, 'src');


module.exports = {
    ELECTRON_RELAUNCH_CODE: 9888,
    ELECTRON_INSPECTION_PORT: 5858,
    SERVER_PORT: 9080,
    SERVER_HOST: 'http://localhost',

    PROJECT_ROOT: PROJECT_ROOT,
    SRC_ROOT: SRC_ROOT,
    MAIN_ROOT: path.join(SRC_ROOT, 'main'),
    RENDERER_ROOT: path.join(SRC_ROOT, 'renderer'),
    RESOURCES_ROOT: path.join(SRC_ROOT, 'resources'),
    DIST_DIR: path.join(PROJECT_ROOT, 'dist')
};


