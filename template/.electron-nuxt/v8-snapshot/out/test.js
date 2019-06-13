"use strict";

var _electron = require("electron");

var _mainWindow = require("./mainWindow");

/* globals INCLUDE_RESOURCES_PATH */
if (typeof snapshotResult !== 'undefined') {
  snapshotResult.setGlobals(global, process, global, {}, console, require);
} // Set `__resources` path to resources files in main process


global.__resources = undefined; // noinspection BadExpressionStatementJS

INCLUDE_RESOURCES_PATH;

if (__resources === undefined) {}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
_electron.app.on('ready', _mainWindow.createWindow); // Quit when all windows are closed.


_electron.app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') _electron.app.quit();
});

_electron.app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  (0, _mainWindow.recreateWindow)();
});