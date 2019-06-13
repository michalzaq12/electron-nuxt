const electronLink = require('electron-link')
const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const PROJECT_DIR = path.join(__dirname, '..', '..',);
const CACHE_DIR = path.join(__dirname, 'cache');
const ELECTRON_SNAPSHOT_GENERATOR = path.join(PROJECT_DIR, 'node_modules', 'electron-mksnapshot', 'bin', 'mksnapshot');
const BASE_ELECTRON_SNAPSHOT_PATH = path.join(PROJECT_DIR, 'node_modules/electron/dist/snapshot_blob.bin');



const MAIN_PATH = path.join(PROJECT_DIR, 'src', 'main', 'mainWindow.js');
const DIST_MAIN_PATH = path.join(PROJECT_DIR, 'dist', 'main', 'index.js');
const SNAPSHOT_STARTUP_SCRIPT = path.join(__dirname, 'startup.js');

const babel = require("@babel/core");
const newCode = babel.transformFileSync(MAIN_PATH, {
    plugins: [
        '@babel/plugin-transform-modules-commonjs',
        'transform-remove-console'
    ],
    compact: false,
    minified: false
}).code;

const TEST_PATH = path.join(__dirname, 'out', 'mainWindow.js');

fs.writeFileSync(TEST_PATH, newCode);



async function main(){
    // const distFile = fs.readFileSync(DIST_MAIN_PATH);
    // vm.runInNewContext(distFile.toString(), undefined, {filename: DIST_MAIN_PATH, displayErrors: true})


    let { snapshotScript } = await electronLink({
        baseDirPath: PROJECT_DIR,
        mainPath: DIST_MAIN_PATH,
        cachePath: CACHE_DIR,
        shouldExcludeModule: modulePath => false
    });
    fs.writeFileSync(SNAPSHOT_STARTUP_SCRIPT, snapshotScript);

    console.log('Verifying if snapshot can be executed via `mksnapshot`')
    vm.runInNewContext(snapshotScript, undefined, {filename: SNAPSHOT_STARTUP_SCRIPT, displayErrors: true})

    // const generatedStartupBlobPath = path.join(__dirname, 'snapshot_blob.bin')
    //
    // console.log(`Generating startup blob at "${generatedStartupBlobPath}"`)
    // childProcess.execFileSync(ELECTRON_SNAPSHOT_GENERATOR, [SNAPSHOT_STARTUP_SCRIPT , '--startup_blob', generatedStartupBlobPath]);


    // let startupBlobDestinationPath
    // if (process.platform === 'darwin') {
    //     startupBlobDestinationPath = `${packagedAppPath}/Contents/Frameworks/Electron Framework.framework/Resources/snapshot_blob.bin`
    // } else {
    //     startupBlobDestinationPath = path.join(packagedAppPath, 'snapshot_blob.bin')
    // }
    //
    // console.log(`Moving generated startup blob into "${startupBlobDestinationPath}"`)
    // fs.unlinkSync(startupBlobDestinationPath)
    // fs.renameSync(generatedStartupBlobPath, startupBlobDestinationPath)
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