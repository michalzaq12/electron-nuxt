/* eslint-disable */
require('electron-debug')({
    showDevTools: true,
    devToolsMode: 'right'
});

import {Menu, MenuItem, app} from "electron";
import {ELECTRON_RELAUNCH_CODE} from '../../.electron-nuxt/config';
import {mainWindowCreated} from './mainWindow';

const VUEJS_DEVTOOLS = {
    id: 'nhdogjmejiglipccpnnnanhbledajbpd',  // => ver 5.1.0
    electron: '>=1.2.1'
};


app.on('ready', () => {
    let installExtension = require('electron-devtools-installer')
    installExtension.default(VUEJS_DEVTOOLS)
        .then(() => {})
        .catch(err => {
            console.log('Unable to install `vue-devtools`: \n', err)
        });

    const menu = Menu.getApplicationMenu();
    const refreshButton = new MenuItem({
        label: 'Relaunch electron',
        accelerator: 'CommandOrControl+E',
        click: () => {
            app.exit(ELECTRON_RELAUNCH_CODE);
        }
    });
    menu.append(refreshButton);
});


mainWindowCreated(mainWindow => {
    mainWindow.webContents.on('did-navigate-in-page', (e, url) => {
        mainWindow.setTitle(url);
    })
});

// Require `main` process to boot app
require('./index');