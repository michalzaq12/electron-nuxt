const Logger = require('./logger');
const path = require('path')
const { spawn, fork } = require('child_process')
const webpack = require('webpack');
const del = require('del')
const mainConfig = require('./webpack.main.config');
const ElectronApp = require('./electron');

process.title = "Electron-nuxt";

const isDev = process.env.NODE_ENV === 'development';

let electronApp = null;
let nuxtProcess = null;



const mainLogger = new Logger('Main', 'yellow');
const nuxtLogger = new Logger('Nuxt', 'green');
const electronLogger = new Logger('Electron', 'blue');
electronLogger.ignore(text => text.indexOf('source: chrome-devtools://devtools/bundled/shell.js (108)') > -1);




function clean () {
    del.sync(['build/*', '!build/icons', '!build/icons/icon.*'])
    console.log(`\n${doneLog}\n`)
    process.exit()
}

function startRenderer () {
    nuxtProcess = fork(path.join(__dirname, 'nuxt-process.js'), {silent: true});

    nuxtProcess.stdout.pipe(nuxtLogger.stdout)
    nuxtProcess.stderr.pipe(nuxtLogger.stderr)

    return new Promise((resolve, reject) => {
        nuxtProcess.once('message', msg => {
            if(msg.status === 'ok') resolve();
            else reject(msg.err);
        })
    });
}


function startMain () {
    return new Promise((resolve, reject) => {
        if(isDev){
            mainConfig.entry.main = [path.join(__dirname, '../src/main/index.dev.js')].concat(mainConfig.entry.main)
            mainConfig.mode = 'development'
        }

        const compiler = webpack(mainConfig)

        compiler.watch({
            ignored: /node_modules/,
            aggregateTimeout: 5000
        }, (err, stats) => {
            if (err) {
                mainLogger.error(err);
                return
            }

            mainLogger.logWebpackStats(stats);
            if(electronApp !== null) electronApp.relaunch();
            resolve()
        })
    })
}


function startElectron () {
    electronApp = new ElectronApp(path.join(__dirname, '../dist/electron/index.js'));
    electronApp.redirectStdout(electronLogger);

    electronApp.on('relaunch', () => {
       Logger.info('Electron relaunching... ')
    });

    electronApp.on('exit', code => {
        Logger.info('Killing all processes (reason: electron app close event) ');
        exitHandler(code);
    })
}


function init () {
    const text = isDev ? 'starting development env...' : 'building for production';
    Logger.spinnerStart(text);


    if(!isDev) del.sync(['dist/electron/*', '!.gitkeep'])

    startRenderer().then(startMain)
        .then(() => {
            if(isDev) startElectron();
            Logger.spinnerSucceed('done');
            if(!isDev) exitHandler('asd')
        })
        .catch(err => {
            Logger.spinnerFail('something went wrong');
            console.error(err)
        })
}


if (process.env.BUILD_TARGET === 'clean') clean()
else init()


let isExiting = false;

async function exitHandler(exitCode) {
    console.log('isExiting ' + isExiting);
    if(isExiting) return;
    isExiting = true;
    console.log('exit code: ' + exitCode);
    await electronApp.exit();
    if(nuxtProcess != null){
        console.log('try to kill nuxt pid: ' + nuxtProcess.pid)
        process.kill(nuxtProcess.pid);
        nuxtProcess = null;
    }

    console.log(' main pid '+ process.pid);
    process.exit();
}



//https://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits
//do something when app is closing
process.on('exit', exitHandler.bind(null));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null));
process.on('SIGUSR2', exitHandler.bind(null));
