const path = require('path');


const ROOT = path.join(__dirname, '..', '..', 'src', 'renderer').replace(/\\/g, '/');


console.log(ROOT);
console.log(__dirname)

export default {
    "files": [
        "test/unit/specs/**/*",
    ],
    "sources": [
        ROOT + '/**/*',
        "src/**/*"
    ],
    "require": [
        "./test/unit/setup.js"
    ],
    "babel": {
        "testOptions": {
            "babelrc": false,
            "configFile": false,
            "plugins": [
                [
                    "babel-plugin-webpack-alias-7",
                    {
                        "config": path.join(__dirname, 'alias.js').replace(/\\/g, '/')
                    }
                ]
            ]
        }
    }
};