const electron = require('electron')
const Logger = require('./logger');
const path = require('path')
const { spawn, fork } = require('child_process')
const webpack = require('webpack');
const psTree = require('ps-tree')
const del = require('del')
const mainConfig = require('./webpack.main.config');
const {ELECTRON_RELAUNCH_CODE} = require('./config');

process.title = "Electron-nuxt";

const isDev = process.env.NODE_ENV === 'development';

let electronProcess = null;
let nuxtProcess = null;
let manualRestart = false;



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
    nuxtProcess = fork(path.join(__dirname, 'nuxt-runner.js'), {silent: true});

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
        mainConfig.entry.main = [path.join(__dirname, '../src/main/index.dev.js')].concat(mainConfig.entry.main)
        mainConfig.mode = 'development'
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

            if (electronProcess) {
                manualRestart = true;
                killElectron().then(() => {
                    electronProcess = null;
                    startElectron();
                    setTimeout(() => {
                        manualRestart = false
                    }, 5000)
                });
            }

            resolve()
        })
    })
}


function startElectron () {
    let args = [
        '--inspect=5858',
        path.join(__dirname, '../dist/electron/index.js'),
        '--auto-detect=false',
        '--no-proxy-server'
    ];

    if (process.env.npm_execpath.endsWith('yarn.js')) {
        args = args.concat(process.argv.slice(3))
    } else if (process.env.npm_execpath.endsWith('npm-cli.js')) {
        args = args.concat(process.argv.slice(2))
    }

    electronProcess = spawn(electron, args)

    electronProcess.stdout.pipe(electronLogger.stdout);
    electronProcess.stderr.pipe(electronLogger.stderr);

    electronProcess.on('exit', code => {
        console.log(code);
        if(code === ELECTRON_RELAUNCH_CODE) return;
        electronProcess = null;
        if (!manualRestart) exitHandler('on electron exit event');
    });
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



function killElectron() {
    console.log('kill electron');
    return new Promise((resolve, reject) => {
        if(!electronProcess) resolve();
        electronProcess.removeAllListeners();
        electronProcess.stdout.unpipe(electronLogger.stdout);
        electronProcess.stderr.unpipe(electronLogger.stderr);
        psTree(electronProcess.pid, (err, children) =>  {
            if(err) reject(err)
            children.map(p => {
                process.kill(p.PID);
            });
            process.kill(electronProcess.pid);
            electronProcess = null;
            resolve();
        });
    });
}

let isExiting = false;

async function exitHandler(exitCode) {
    console.log('isExiting ' + isExiting);
    if(isExiting) return;
    isExiting = true;
    console.log('exit code: ' + exitCode);
    if(electronProcess != null) {
        console.log('try to kill electron pid: ' + electronProcess.pid)
        await killElectron();
    }
    if(nuxtProcess != null){
        console.log('try to kill nuxt pid: ' + nuxtProcess.pid)
        nuxtProcess.kill();
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
