import {NUXT_SSR_MODE} from './.electron-nuxt/config'
import { idText } from 'typescript'
const ICONS_DIR = 'build/icons/'

const windowsOS = {
  win: {
    icon: ICONS_DIR + 'win-icon.ico',
    publisherName: 'michal',
    target: 'nsis'
  },

  nsis: {
    differentialPackage: true
  }
}

const linuxOS = {
  linux: {
    icon: ICONS_DIR,
    target: 'deb'
  }
}

const macOS = {
  mac: {
    target: 'dmg',
    icon: ICONS_DIR + 'con.icns'
  },
  dmg: {
    contents: [
      {
        x: 410,
        y: 150,
        type: 'link',
        path: '/Applications'
      },
      {
        x: 130,
        y: 150,
        type: 'file'
      }
    ]
  }
}

const files=[
  'package.json',
  {
    from: 'dist/main/',
    to: 'dist/main/'
  },
  {
    from: 'src/resources/',
    to: 'dist/resources/'
  }
]
//if not ssr mode, add nuxt generate dist to Electron
if(!NUXT_SSR_MODE){
  files.push({
    from: 'dist/renderer',
    to: 'dist/renderer/'
  })
}


module.exports = {
  asar: false,
  productName: 'My browser',
  appId: 'org.michalzarach.my-browser',
  artifactName: 'my-browser-${version}.${ext}',
  directories: {
    output: 'build'
  },
  // default files: https://www.electron.build/configuration/contents
  files: files,
  ...windowsOS,
  ...linuxOS,
  ...macOS
}
