

module.exports = {
    "asar": false,
    "productName": "My browser",
    "appId": "org.michalzarach.my-browser",
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
        "icon": "build/icons/icon.icns"
    },
    "win": {
        "icon": "build/icons/win-icon.ico",
        "publisherName": "michal"
    },
    "linux": {
        "icon": "build/icons"
    },
    "nsis": {
        "differentialPackage": true,
        "artifactName": "my-browser-${version}.${ext}"
    }
};
