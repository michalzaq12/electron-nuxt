const isDev = process.env.NODE_ENV === 'development'
const webpack = require('webpack')
const webpackConfig = require('./webpack.main.config')
const EventEmitter = require('events')

class MainApp extends EventEmitter {
  constructor (aggregateTimeout = 5000) {
    super()
    this.aggregateTimeout = aggregateTimeout
    this._compiler = webpack(webpackConfig)
  }

  async build () {
    return isDev ? this._watch() : this._run()
  }

  async _watch () {
    return new Promise(resolve => {
      this._compiler.watch({
        ignored: /node_modules/,
        aggregateTimeout: this.aggregateTimeout
      }, (err, stats) => {
        if (err) this.emit('error', err)
        else this.emit('after-compile', stats)
        resolve()
      })
    })
  }

  async _run () {
    return new Promise((resolve, reject) => {
      this._compiler.run((err, stats) => {
        this.emit('after-compile', stats)
        if (err || stats.hasErrors()) reject('Error occurred during webpack compilation step') // eslint-disable-line prefer-promise-reject-errors
        resolve()
      })
    })
  }
}

module.exports = MainApp
