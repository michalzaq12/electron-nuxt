const isProduction = process.env.NODE_ENV === 'production';
import {BrowserWinHandler} from './BrowserWinHandler';
import path from 'path';


const INDEX_PATH = path.join(__dirname, '..', 'renderer', 'index.html');
const DEV_SERVER_URL = process.env.DEV_SERVER_URL;


const winHandler = new BrowserWinHandler({
    height: 600,
    width: 1000,
});

winHandler.onCreated(browserWindow => {
    const winURL = isProduction ? INDEX_PATH : DEV_SERVER_URL;
    browserWindow.loadURL(winURL);
});


export default winHandler;