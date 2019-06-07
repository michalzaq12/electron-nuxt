const Logger = require('./logger');
const path = require('path')
const webpack = require('webpack');
const del = require('del')
const mainConfig = require('./webpack.main.config');
const ElectronApp = require('./electron');
const NuxtApp = require('./nuxt-runner');


const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const mainLogger = new Logger('Main', 'yellow');
const nuxtLogger = new Logger('Nuxt', 'green');
const electronLogger = new Logger('Electron', 'blue');
electronLogger.ignore(text => text.indexOf('source: chrome-devtools://devtools/bundled/shell.js (108)') > -1);

let electronApp = null;

const nuxtApp = new NuxtApp();
nuxtApp.redirectStdout(nuxtLogger);

function cleanBuildDirectory () {
    try{
        del.sync(['dist/main/*', '!.gitkeep']);
        del.sync(['dist/renderer/*', '!.gitkeep']);
        del.sync(['build/**/*.pak']);
    }catch (e) {
        Logger.spinnerFail('Error occurred when cleaning build directory');
        console.error(e);
        cleanupProcessAndExit(1);
    }
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
    electronApp = new ElectronApp(path.join(__dirname, '../dist/main/index.js'));
    electronApp.redirectStdout(electronLogger);

    electronApp.on('relaunch', () => {
        Logger.reset();
        Logger.info('Relaunching electron... ')
    });

    electronApp.on('exit', code => {
        Logger.info('Killing all processes (reason: electron app close event) ');
        cleanupProcessAndExit(code);
    })
}


(function buildPipeline () {
    const text = isDev ? 'starting development env...' : 'building for production';
    Logger.spinnerStart(text);

    if(!isDev) cleanBuildDirectory();

    Promise.all([nuxtApp.build(), startMain()])
        .then(() => {
            if(isDev) startElectron();
            Logger.spinnerSucceed('Done');
            if(!isDev) cleanupProcessAndExit(0)
        })
        .catch(err => {
            Logger.spinnerFail('Something went wrong');
            console.error(err)
        })
})();




async function cleanupProcessAndExit(exitCode, exit = true) {
    if(electronApp) await electronApp.exit(); //on production build electron does not start
    nuxtApp.exit();
    if(exit) process.exit();
}



//https://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits

// exit param = false -> prevention of an infinite loop
process.on('exit', code => cleanupProcessAndExit(code, false));

//catches ctrl+c event
process.on('SIGINT', code => cleanupProcessAndExit(code));

// catches "kill pid"
process.on('SIGUSR1', code => cleanupProcessAndExit(code));
process.on('SIGUSR2', code => cleanupProcessAndExit(code));


//catches uncaught exceptions
process.on('uncaughtException', e => {
    console.log('Uncaught Exception');
    console.log(e.stack);
    cleanupProcessAndExit(99);
});