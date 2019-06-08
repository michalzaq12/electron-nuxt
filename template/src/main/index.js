/* globals INCLUDE_RESOURCES_PATH */

// Set `__resources` path to resources files in main process
global.__resources = undefined;
// noinspection BadExpressionStatementJS
INCLUDE_RESOURCES_PATH
if(__resources === undefined) console.error('[Main-process]: Resources path is undefined');

import { app } from 'electron'
import {createWindow, recreateWindow} from './mainWindow'


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    recreateWindow()
});

