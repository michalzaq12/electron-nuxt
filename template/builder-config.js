const ICONS_DIR = 'build/icons/';


const windowsOS = {
    win: {
        icon: ICONS_DIR +'win-icon.ico',
        publisherName: 'michal'
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
};

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
};


module.exports = {
    asar: false,
    productName: 'My browser',
    appId: 'org.michalzarach.my-browser',
    artifactName: 'my-browser-${version}.${ext}',
    directories: {
        output: 'build'
    },
    files: [
        'dist/**/*',
        {
            from: 'src/resources/',
            to: 'resources/'
        }
    ],
    //default files: https://www.electron.build/configuration/contents
    ...windowsOS,
    ...linuxOS,
    ...macOS
};




