import { BrowserWindow, globalShortcut } from 'electron'
import { EventEmitter } from 'events';
import {SERVER_PORT} from '../../.electron-nuxt/config';
import path from 'path';

const INDEX_PATH_ON_PRODUCTION = path.join(__dirname, '..', 'renderer', 'index.html');

const eventEmitter = new EventEmitter();

const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:${SERVER_PORT}`
    : INDEX_PATH_ON_PRODUCTION;

let mainWindow = null;


export function createWindow() {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 1000
    });


    mainWindow.loadURL(winURL);

    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    });

    // Uncomment this for unable DevTools in production build
    // globalShortcut.register('CommandOrControl+Shift+K', () => {
    //     console.log('CommandOrControl+Shift+K')
    //     mainWindow.webContents.openDevTools();
    // });

    console.log(__resources);
    eventEmitter.emit('created')
}

export function recreateWindow() {
    if(mainWindow === null) createWindow();
}

export function mainWindowCreated(cb) {
    eventEmitter.on('created', () => {
        cb(mainWindow);
    })
}

