import { app, BrowserWindow, globalShortcut } from 'electron'


/**
 * Set `__resources` path to resources files in main process
 */
if (process.env.NODE_ENV !== 'development') {
    global.__resources = require('path').join(__dirname, '..', 'resources')
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`;





function createWindow () {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 600,
        width: 1000
    });


    mainWindow.loadURL(winURL);

    mainWindow.on('closed', () => {
        mainWindow = null
    });

    /**
     * Additional window setup
     */
    globalShortcut.register('CommandOrControl+Shift+K', () => {
        console.log('CommandOrControl+Shift+K')
        mainWindow.webContents.openDevTools();
    })

    console.log(__resources);
}


app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});



app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
});

