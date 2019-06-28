const path = require('path');
const { BUILD_DIR } = require('../../.electron-nuxt/config');
const { productName } = require('../../builder-config');
const fs = require('fs');


const YELLOW = '\x1b[33m';
const END = '\x1b[0m';

let extension = '';
let unpackedDir = ''

let os = process.platform;
if (os === "darwin") {
    unpackedDir = 'mac';
} else if (os === "win32" || os === "win64") {
    unpackedDir = 'win-unpacked';
    extension = '.exe';
} else if (os === "linux") {
    unpackedDir = 'linux-unpacked';
}

const applicationPath = path.join(BUILD_DIR, `${unpackedDir}/${productName}${extension}`);

if (!fs.existsSync(applicationPath)) {
    throw new Error(`${YELLOW}[Spectron setup]: Application with path: '${applicationPath}' doesn't exist. 
        First build your app ('npm run build') or set proper path to unpacked binary.${END}`)
}

process.env.APPLICATION_PATH = applicationPath;
