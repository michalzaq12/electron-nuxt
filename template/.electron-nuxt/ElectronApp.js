const electronPath = require('electron');
const { spawn } = require('child_process');
const EventEmitter = require('events');
const { killWithAllSubProcess } = require('./utils/kill-process');
const { ELECTRON_RELAUNCH_CODE, ELECTRON_INSPECTION_PORT } = require('./config');


class ElectronApp extends EventEmitter {
    constructor(mainProcessIndexJSPath){
        super();
        this.mainProcessIndexJSPath = mainProcessIndexJSPath;
        this.outputStd = null;
        this.process = null;
    }

    launch(){
        let args = [
            `--inspect=${ELECTRON_INSPECTION_PORT}`,
            this.mainProcessIndexJSPath,
            '--auto-detect=false',
            '--no-proxy-server'
        ];

        if (process.env.npm_execpath.endsWith('yarn.js')) {
            args = args.concat(process.argv.slice(3))
        } else if (process.env.npm_execpath.endsWith('npm-cli.js')) {
            args = args.concat(process.argv.slice(2))
        }

        this.process = spawn(electronPath, args);

        if(this.outputStd) this._pipe(this.outputStd);

        this.process.on('exit', code => {
            if(code === ELECTRON_RELAUNCH_CODE) {
                this.relaunch();
            }else{
                this.exit()
                this.emit('exit', code);
            }
        });
    }

    get isRunning(){
        return this.process !== null;
    }

    get pid(){
        if(!this.isRunning) return undefined;
        else return this.process.pid;
    }

    async relaunch(){
        if(!this.isRunning) return;
        this.emit('relaunch');
        await this.exit();
        this.launch();
    }


    async exit(){
        if(!this.isRunning) return;
        this.process.removeAllListeners('exit');
        this.closeProcessStd();

        await killWithAllSubProcess(this.pid);
        this.process= null;
    }

    closeProcessStd(){
        this.process.stdout.end();
        this.process.stderr.end();
    }

    redirectStdout(stream){
        this.outputStd = stream;
        this._pipe(stream);
    }

    _pipe(stream){
        if(!this.isRunning) return;
        this.process.stdout.pipe(stream.stdout);
        this.process.stderr.pipe(stream.stderr);
    }

}


module.exports = ElectronApp;