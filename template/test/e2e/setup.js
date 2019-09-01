const path = require('path')
const { BUILD_DIR } = require('../../.electron-nuxt/config')
const { productName } = require('../../builder.config')
const { name } = require('../../package')
const fs = require('fs')

const YELLOW = '\x1b[33m'
const END = '\x1b[0m'

let relativeAppPath = ''

const os = process.platform
if (os === 'darwin') {
  relativeAppPath = `mac/${productName}.app/Contents/MacOS/${productName}`
} else if (os === 'win32' || os === 'win64') {
  relativeAppPath = `win-unpacked/${productName}.exe`
} else if (os === 'linux') {
  relativeAppPath = `linux-unpacked/${name}`
}

const applicationPath = path.join(BUILD_DIR, relativeAppPath)

if (!fs.existsSync(applicationPath)) {
  throw new Error(`${YELLOW}[Spectron setup]:${END} Application with path: '${applicationPath}' doesn't exist.
        First build your app ('npm run build') or set proper path to executable binary.`)
}

process.env.APPLICATION_PATH = applicationPath
