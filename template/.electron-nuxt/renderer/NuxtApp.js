const path = require('path');
const { fork } = require('child_process');
const { killProcess } = require('../utils/kill-process');

const NUXT_PROCESS_PATH = path.join(__dirname, 'nuxt-process.js');

class NuxtApp {
    constructor(){
        this.nuxtProcess = fork(NUXT_PROCESS_PATH, {silent: true});
    }

    async build(){
        return new Promise((resolve, reject) => {
            this.nuxtProcess.send({action: 'build', target: process.env.NODE_ENV});
            this.nuxtProcess.once('message', ({status, err}) => {
                if(status === 'ok') resolve();
                else reject(err);
            })
        })
    }

    redirectStdout(stream){
        this.nuxtProcess.stdout.pipe(stream.stdout);
        this.nuxtProcess.stderr.pipe(stream.stderr);
    }

    exit(){
        this.nuxtProcess.kill();
        if(this.nuxtProcess && !this.nuxtProcess.killed) killProcess(this.nuxtProcess.pid);
        this.nuxtProcess = null;
    }

}


module.exports = NuxtApp;