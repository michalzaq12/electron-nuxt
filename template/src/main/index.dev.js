import { Menu, MenuItem, app } from 'electron'
import electronDebug from 'electron-debug'
import vueDevtools from 'vue-devtools'
import { ELECTRON_RELAUNCH_CODE } from '../../.electron-nuxt/config'
import mainWinHandler from './mainWindow'
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

electronDebug({
  showDevTools: false,
  devToolsMode: 'right'
})

app.on('ready', () => {
  vueDevtools.install()
  const menu = Menu.getApplicationMenu()
  const refreshButton = new MenuItem({
    label: 'Relaunch electron',
    accelerator: 'CommandOrControl+E',
    click: () => {
      app.exit(ELECTRON_RELAUNCH_CODE)
    }
  })
  menu.append(refreshButton)
  Menu.setApplicationMenu(menu)
})

mainWinHandler.onCreated(browserWindow => {
  browserWindow.webContents.openDevTools()
})

// Require `main` process to boot app
require('./index')
