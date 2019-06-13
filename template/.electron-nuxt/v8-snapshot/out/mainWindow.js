"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createWindow = createWindow;
exports.recreateWindow = recreateWindow;
exports.mainWindowCreated = mainWindowCreated;

var _electron = require("electron");

var _events = require("events");

var _config = require("../../.electron-nuxt/config");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const INDEX_PATH_ON_PRODUCTION = _path.default.join(__dirname, '..', 'renderer', 'index.html');

const eventEmitter = new _events.EventEmitter();
const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:${_config.SERVER_PORT}` : INDEX_PATH_ON_PRODUCTION;
let mainWindow = null;

function createWindow() {
  mainWindow = new _electron.BrowserWindow({
    height: 600,
    width: 1000
  });
  mainWindow.loadURL(winURL);
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  }); // Uncomment this for unable DevTools in production build
  // globalShortcut.register('CommandOrControl+Shift+K', () => {
  //     console.log('CommandOrControl+Shift+K')
  //     mainWindow.webContents.openDevTools();
  // });

  eventEmitter.emit('created');
}

function recreateWindow() {
  if (mainWindow === null) createWindow();
}

function mainWindowCreated(cb) {
  eventEmitter.on('created', () => {
    cb(mainWindow);
  });
}