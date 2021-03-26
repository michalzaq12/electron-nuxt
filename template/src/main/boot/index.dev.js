/* eslint-disable */
import { Menu, MenuItem, app } from 'electron'
import { ELECTRON_RELAUNCH_CODE } from '../../../.electron-nuxt/config'
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'


app.on('ready', () => {
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


// Require `main` process to boot app
require('../index')
