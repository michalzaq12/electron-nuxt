const electronLink = require('electron-link')
const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const BASE_DIR = path.join(__dirname, 'src', 'main');
const MAIN_PATH = path.join(BASE_DIR, 'index.js');
const CACHE_DIR = path.join(__dirname, 'cache');

const SNAPSHOT_SCRIPT_PATH = path.join(__dirname, 'snap.js');


// const babel = require("@babel/core");
// const newCode = babel.transformFileSync(MAIN_PATH, {
//     plugins: [
//         '@babel/plugin-transform-modules-commonjs'
//     ],
//     compact: false,
//     minified: false
// }).code;
//
// const TEST_PATH = path.join(BASE_DIR, 'test.js');
//
// fs.writeFileSync(TEST_PATH, newCode);


// snapshot.js
class SnapshotCreator {
    constructor(snapshot ){
        this.linkedContent = null;
        this.snapshot = snapshot;
        this.mksnapshot = path.join(__dirname, 'node_modules', 'electron-mksnapshot', 'bin', 'mksnapshot');
    }

    async link() {
        let response = await electronLink({
            baseDirPath: BASE_DIR,
            mainPath: MAIN_PATH,
            cachePath: CACHE_DIR,
            shouldExcludeModule: modulePath => false
        });

        this.linkedContent = response.snapshotScript;
    }

    createSnapshot() {
        childProcess.execFileSync(
            this.mksnapshot,
            ['--no-use-ic', SNAPSHOT_SCRIPT_PATH, '--startup-blob', this.snapshot]);
    }

    saveLinkedFile() {
        fs.writeFileSync(SNAPSHOT_SCRIPT_PATH, this.linkedContent);
    }
}

async function main(){
    const pathToSnapshot = "./node_modules/electron/dist/snapshot_blob.bin";
    const snapshotCreator = new SnapshotCreator(pathToSnapshot);
    await snapshotCreator.link();
    snapshotCreator.saveLinkedFile();
    snapshotCreator.createSnapshot();
}

main().then(() => {
    console.log('OK');
}).catch(err => {
    console.log(err);
})



// electronLink({
//     baseDirPath: BASE_DIR,
//     mainPath: MAIN_PATH,
//     cachePath: CACHE_DIR,
//     shouldExcludeModule: (modulePath) => false
// }).then(({snapshotScript, includedFilePaths}) => {
//     console.log(includedFilePaths);
//     fs.writeFileSync(SNAPSHOT_SCRIPT_PATH, snapshotScript);
// }).catch(err => {
//     console.log(err);
// })





//vm.runInNewContext(snapshotScript, undefined, {filename: snapshotScriptPath, displayErrors: true})