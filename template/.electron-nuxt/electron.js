const electronPath = require('electron');
const { spawn } = require('child_process');
const EventEmitter = require('events');
const psTree = require('ps-tree');

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

        console.log('spawn process');
        this.process = spawn(electronPath, args);
        console.log('spawned');

        if(this.outputStd !== null){
            console.log('repipe std');
            this._pipe(this.outputStd);
        }
        console.log('process pid ', this.process.pid);

        this.process.on('exit', code => {
            console.log('electron process exit: ', code);
            if(code === ELECTRON_RELAUNCH_CODE) {
                this.restart();
            }else{
                this._killWithAllSubProcesses();
                this.emit('exit', code);
            }
        });
    }

    restart(){
        console.log('restart');
        this._killWithAllSubProcesses().then(() => {
            this._startProcess(false);
        })
    }

    exit(){
        return this._killWithAllSubProcesses();
    }

    _killWithAllSubProcesses(){
        console.log('killWithAllSubProcesses');
        return new Promise((resolve, reject) => {
            if(this.process === null) resolve();
            this.process.removeAllListeners('exit');
            //this.unpipeAll();
            this.closeProcessStd();
            psTree(this.process.pid, (err, children) =>  {
                if(err) reject(err);
                children.map(p => {
                    try{
                        process.kill(p.PID);
                    }catch (e) {
                        console.log('asd@1');
                    }
                });
                try{
                    process.kill(this.process.pid);
                }catch (e) {
                    console.log('asd@2')
                }
                this.process= null;
                resolve();
            });
        });
    }

    closeProcessStd(){
        this.process.stdout.end();
        this.process.stderr.end();
    }

    redirectStdout(stream){
        console.log('-push stream');
        this.outputStd = stream;
        this._pipe(stream);
    }

    _pipe(stream){
        this.process.stdout.pipe(stream.stdout);
        this.process.stderr.pipe(stream.stderr);
    }

    unpipeAll(){
        if(this.process !== null){
            this.process.stdout.unpipe();
            this.process.stderr.unpipe();
        }
    }

}


module.exports = ElectronApp;