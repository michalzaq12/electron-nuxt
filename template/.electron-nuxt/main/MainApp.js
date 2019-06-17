const webpack = require('webpack');
const webpackConfig = require('./webpack.main.config');
const EventEmitter = require('events');

class MainApp extends EventEmitter {

    constructor(aggregateTimeout = 5000){
        super();
        this.aggregateTimeout = aggregateTimeout;
        this._compiler = webpack(webpackConfig);
    }

    async build(){
        return new Promise(resolve => {
            this._compiler.watch({
                ignored: /node_modules/,
                aggregateTimeout: this.aggregateTimeout
            }, (err, stats) => {
                if (err) {
                    this.emit('error', err);
                    return
                }

                this.emit('after-compile', stats);
                resolve()
            })
        })
    }
}


module.exports = MainApp;