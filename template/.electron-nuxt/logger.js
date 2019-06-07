const chalk = require('chalk');
const { Writable } = require('stream');
const ora = require('ora');
const readline = require('readline');

const spinner = ora({
    text: 'Staring ...',
    stream: process.stdout,
    indent: 9,
    color: 'white'
});

const staticLogger = ora({
    isEnabled: false,
    stream: process.stdout,
    indent: 9,
    color: 'white'
});

let lastLogger = '';

class Logger {
    constructor(loggerName, color){
        this.loggerName = loggerName;
        this.color = color;
        this._initStreams();
    }

    _initStreams(){
        const self = this;
        this.stdout = new Writable({
            write(chunk, encoding, callback) {
                self.info(chunk);
                callback();
            }
        });
        this.stderr = new Writable({
            write(chunk, encoding, callback) {
                self.error(chunk);
                callback();
            }
        });

        this.stdout.on('end', () => {
            console.log('END---------------')
        })

        this.stdout.on('close', () => {
            console.log('CLOSE---------------')
        })

        this.stdout.on('finish', () => {
            console.log('FINISH---------------')
        })

        this.stdout.on('unpipe', () => {
            console.log('UNPIPE---------------');
            this._initStreams();
        })

        this.stdout.on('error', err => {
            console.log('ERROR---------------')
            console.log(err);
        })
    }


    static _parseSpinnerText(text){
        return chalk.inverse('Electron-nuxt') + ': ' + chalk.underline(text);
    }

    static spinnerStart(text){
        if(text !== undefined) spinner.text = Logger._parseSpinnerText(text);
        spinner.start();
    }

    static spinnerSucceed(text){
        spinner.succeed(Logger._parseSpinnerText(text));
    }

    static spinnerFail(text){
        spinner.fail(Logger._parseSpinnerText(text));
    }

    static info(text){
        staticLogger.info(Logger._parseSpinnerText(text));
    }

    info(text){
        text = text.toString();
        if(this.ignoreFunction !== undefined && this.ignoreFunction(text)) return;
        Logger._log(this.loggerName, this.color, text);
    }

    error(text){
        text = text.toString();
        if(this.ignoreFunction !== undefined && this.ignoreFunction(text)) return;
        Logger._log(this.loggerName, this.color, text, 'red');
    }

    logWebpackStats(data){
        return this.info(data.toString({
            colors: true,
            chunks: false
        }))
    }

    ignore(ignoreFunc){
        this.ignoreFunction = ignoreFunc;
    }



    static _log(loggerName, loggerColor, text, textColor){
        if(text.trim() === '' || text.trim() === ' ') return;
        if(spinner.isSpinning) {
            readline.clearLine(process.stdout, 0);
            readline.cursorTo(process.stdout, 0);
        }
        if(lastLogger !== loggerName) console.log(chalk.keyword('white').bgKeyword(loggerColor)(`\n  ${loggerName}  `));
        text = text.split(/\r?\n/).map(el => chalk.keyword(loggerColor)('│  ') + el).join('\n');
        if(textColor !== undefined) process.stdout.write(chalk.keyword(textColor)(text));
        else process.stdout.write(text);
        process.stdout.write('\n');
        lastLogger = loggerName;
    }



}

module.exports = Logger;