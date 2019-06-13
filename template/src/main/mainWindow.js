import { BrowserWindow, globalShortcut } from 'electron'
import { EventEmitter } from 'events';
import {SERVER_PORT} from '../../.electron-nuxt/config';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';

const INDEX_PATH = path.join(__dirname, '..', 'renderer', 'index.html');
const DEVELOPMENT_SERVER = `http://localhost:${SERVER_PORT}`;



class MainWindow extends EventEmitter {

    constructor(){
        super();
        this.windowHandler = null;
    }

    create(){
        this.windowHandler = new BrowserWindow({
            height: 600,
            width: 1000,
            webPreferences: {
                webSecurity: isProduction
            },
        });

        const winURL = isProduction ? INDEX_PATH : DEVELOPMENT_SERVER;
        this.windowHandler.loadURL(winURL);

        this.windowHandler.on('closed', () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            this.windowHandler = null
        });

        // Uncomment this for unable DevTools in production build
        // globalShortcut.register('CommandOrControl+Shift+K', () => {
        //     console.log('CommandOrControl+Shift+K')
        //     mainWindow.webContents.openDevTools();
        // });

        this.emit('created', this.windowHandler);
    }

    recreate(){
        if(this.windowHandler === null) this.create();
    }

    close(){
        this.windowHandler.close();
    }

    /**
     *
     * @returns {BrowserWindow}
     */
    getWindowHandler(){
        return this.windowHandler;
    }
}


const window = new MainWindow()
export default window;