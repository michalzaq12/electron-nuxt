const Logger = require('./utils/logger');
const path = require('path')
const del = require('del')

const ElectronApp = require('./ElectronApp');
const NuxtApp = require('./renderer/NuxtApp');
const MainApp = require('./main/MainApp');


const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const mainLogger = new Logger('Main', 'yellow');
const nuxtLogger = new Logger('Nuxt', 'green');
const electronLogger = new Logger('Electron', 'blue');
electronLogger.ignore(text => text.indexOf('source: chrome-devtools://devtools/bundled/shell.js (108)') > -1);



const nuxtApp = new NuxtApp();
nuxtApp.redirectStdout(nuxtLogger);


const electronApp = new ElectronApp(path.join(__dirname, '../dist/main/index.js'));
electronApp.redirectStdout(electronLogger);
electronApp.on('relaunch', () => {
    Logger.info('Relaunching electron... ')
});
electronApp.on('exit', code => {
    Logger.info('Killing all processes... (reason: electron app close event) ');
    cleanupProcessAndExit(code);
});


const mainApp = new MainApp();
mainApp.on('error', err => {
    mainLogger.error(err);
})
mainApp.on('after-compile', webpackStats => {
    mainLogger.logWebpackStats(webpackStats);
    electronApp.relaunch();
})


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


(function buildPipeline () {
    const text = isDev ? 'starting development env...' : 'building for production';
    Logger.spinnerStart(text);

    if(isProd) cleanBuildDirectory();

    Promise.all([nuxtApp.build(), mainApp.build()])
        .then(() => {
            if(isDev) electronApp.launch();
            Logger.spinnerSucceed('Done');
            if(!isDev) cleanupProcessAndExit(0)
        })
        .catch(err => {
            Logger.spinnerFail('Something went wrong');
            console.error(err)
        })
})();




async function cleanupProcessAndExit(exitCode, exit = true) {
    await electronApp.exit();
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