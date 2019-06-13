const isProduction = process.env.NODE_ENV === 'production';
import {BrowserWinHandler} from './BrowserWinHandler';
import {SERVER_PORT} from '../../.electron-nuxt/config';
import path from 'path';


const INDEX_PATH = path.join(__dirname, '..', 'renderer', 'index.html');
const DEVELOPMENT_SERVER = `http://localhost:${SERVER_PORT}`;


const winHandler = new BrowserWinHandler({
    height: 600,
    width: 1000,
});

winHandler.onCreated(browserWindow => {
    const winURL = isProduction ? INDEX_PATH : DEVELOPMENT_SERVER;
    browserWindow.loadURL(winURL);
});


export default winHandler;