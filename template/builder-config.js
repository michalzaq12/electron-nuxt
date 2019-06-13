
const ICONS_DIR = 'build/icons/';


module.exports = {
    "asar": false,
    "productName": "My browser",
    "appId": "org.michalzarach.my-browser",
    "artifactName": "my-browser-${version}.${ext}",
    "directories": {
        "output": "build"
    },
    "files": [
        "dist/**/*",
        {
            from: 'src/resources/',
            to: 'resources/'
        }
    ],
    "dmg": {
        "contents": [
            {
                "x": 410,
                "y": 150,
                "type": "link",
                "path": "/Applications"
            },
            {
                "x": 130,
                "y": 150,
                "type": "file"
            }
        ]
    },
    "mac": {
        "target": "dmg",
        "icon": ICONS_DIR + "icon.icns"
    },
    "win": {
        "icon": ICONS_DIR + "win-icon.ico",
        "publisherName": "michal"
    },
    "linux": {
        "icon": ICONS_DIR
    },
    "nsis": {
        "differentialPackage": true
    }
};
