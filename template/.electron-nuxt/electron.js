const electronPath = require('electron');
const { spawn } = require('child_process');
const EventEmitter = require('events');
const { killWithAllSubProcess } = require('./kill-process');


const ELECTRON_RELAUNCH_CODE = 9888;

class ElectronApp extends EventEmitter{
    constructor(mainProcessIndexJSPath){
        super();
        this.mainProcessIndexJSPath = mainProcessIndexJSPath;
        this.outputStd = null;
        this._startProcess();
    }

    _startProcess(){
        let args = [
            '--inspect=5858',
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

        if(this.outputStd !== null){
            this._pipe(this.outputStd);
        }


        this.process.on('exit', code => {
            if(code === ELECTRON_RELAUNCH_CODE) {
                this.relaunch();
            }else{
                this._killWithAllSubProcesses();
                this.emit('exit', code);
            }
        });
    }

    async relaunch(){
        this.emit('relaunch');
        await this._killWithAllSubProcesses();
        this._startProcess();
    }

    async exit(){
        return this._killWithAllSubProcesses();
    }

    async _killWithAllSubProcesses(){
        if(this.process === null) return Promise.resolve();
        this.process.removeAllListeners('exit');
        this.closeProcessStd();

        await killWithAllSubProcess(this.process.pid);
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
        this.process.stdout.pipe(stream.stdout);
        this.process.stderr.pipe(stream.stderr);
    }

}


module.exports = ElectronApp;