import { EventEmitter } from 'events'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import { BrowserWindow, app } from 'electron'
const isProduction = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'

export default class BrowserWinHandler {
  /**
   * @param [options] {object} - browser window options
   * @param [allowRecreate] {boolean}
   */
  constructor (options, allowRecreate = true) {
    this._eventEmitter = new EventEmitter()
    this.allowRecreate = allowRecreate
    this.options = options
    this.browserWindow = null
    this._createInstance()
  }

  _createInstance () {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on('ready', async () => {
      if (isDev) {
        try { await installExtension(VUEJS_DEVTOOLS) } catch(e) {}
      }
      this._create()
    })

    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (!this.allowRecreate) return
    app.on('activate', () => this._recreate())
  }

  _create () {
    this.browserWindow = new BrowserWindow(
      {
        ...this.options,
        webPreferences: {
          ...this.options.webPreferences,
          webSecurity: isProduction, // disable on dev to allow loading local resources
          nodeIntegration: true, // allow loading modules via the require () function
          contextIsolation: !isDev, // https://github.com/electron/electron/issues/18037#issuecomment-806320028
        }
      }
    )
    this.browserWindow.on('closed', () => {
      // Dereference the window object
      this.browserWindow = null
    })
    this._eventEmitter.emit('created')
  }

  _recreate () {
    if (this.browserWindow === null) this._create()
  }

  /**
   * @callback onReadyCallback
   * @param {BrowserWindow}
   */

  /**
   *
   * @param callback {onReadyCallback}
   */
  onCreated (callback) {
    if (this.browserWindow !== null) return callback(this.browserWindow);
    this._eventEmitter.once('created', () => {
      if (isDev) this.browserWindow.webContents.openDevTools()
      callback(this.browserWindow)
    })
  }

  /**
   *
   * @returns {Promise<BrowserWindow>}
   */
  created () {
    if (this.browserWindow !== null) return Promise.resolve(this.browserWindow);
    return new Promise(resolve => {
      this._eventEmitter.once('created', () => {
        if (isDev) this.browserWindow.webContents.openDevTools()
        resolve(this.browserWindow)
      })
    })
  }
}
