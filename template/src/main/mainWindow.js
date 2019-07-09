/* globals INCLUDE_RESOURCES_PATH */

import { BrowserWinHandler } from './BrowserWinHandler'
import path from 'path'
const isDev = process.env.NODE_ENV === 'development'

const INDEX_PATH = path.join(__dirname, '..', 'renderer', 'index.html')
const DEV_SERVER_URL = process.env.DEV_SERVER_URL

// Set `__resources` path to resources files in main process
global.__resources = INCLUDE_RESOURCES_PATH

const winHandler = new BrowserWinHandler({
  height: 600,
  width: 1000
})

winHandler.onCreated(browserWindow => {
  if (isDev) browserWindow.loadURL(DEV_SERVER_URL)
  else browserWindow.loadFile(INDEX_PATH)
})

export default winHandler
