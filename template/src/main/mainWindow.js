import BrowserWinHandler from './BrowserWinHandler'

const winHandler = new BrowserWinHandler({
  height: 600,
  width: 1000
})

winHandler.onCreated(browserWindow => {
  winHandler.loadPage('/')
  // Or load custom url
  // browserWindow.loadURL('https://google.com')
})

export default winHandler
