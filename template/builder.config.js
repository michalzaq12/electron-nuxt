const ICONS_DIR = 'build/icons/'

const windowsOS = {
  win: {
    icon: ICONS_DIR + 'win-icon.ico',
    publisherName: 'michal',
    target: 'nsis'
  },

  // https://www.electron.build/configuration/nsis.html
  nsis: {
    differentialPackage: true,
    allowToChangeInstallationDirectory: false,  // set to true if you want allow user choose folder
    oneClick: true,                             // set to false, if you set allowToChangeInstallationDirectory to true
    deleteAppDataOnUninstall: false
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

module.exports = {
  productName: '{{ name }}',
  appId: '{{ appid }}',
  artifactName: 'setup-${version}.${ext}',
  directories: {
    output: 'build'
  },
  // default files: https://www.electron.build/configuration/contents
  files: [
    'package.json',
    {
      from: 'dist/main/',
      to: 'dist/main/'
    },
    {
      from: 'dist/renderer',
      to: 'dist/renderer/'
    }
  ],
  extraResources: [
    {
      from: 'src/extraResources/',
      to: ''
    }
  ],
  ...windowsOS,
  ...linuxOS,
  ...macOS
}
