const hooks = require('require-extension-hooks')
const env = require('browser-env')
const path = require('path');


global.__resources = 'D:\\git_repos\\electron-nuxt\\template\\src\\resources';

env()
hooks('vue').plugin('vue').push()
hooks(['vue', 'js']).exclude(
    ({filename}) => filename.match(/\/node_modules\//) || filename.includes('alias.js')
    )
    .plugin('babel', {
        "plugins": [
            [
                "babel-plugin-webpack-alias-7",
                {
                    "config": path.join(__dirname, 'alias.js').replace(/\\/g, '/')
                }
            ]
        ]
    }).push();