process.env.BABEL_ENV = 'renderer'
const isProduction = process.env.NODE_ENV === 'production'
const path = require('path');
const { dependencies } = require('../package.json')
const webpack = require('webpack')
const { resourcesPath } = require('./config');

// By default all dependencies (not devDependencies) from package.json are excluded from webpack bundle,
// however, they are still available (without any transformation) in renderer process.
// If you really need to add dependency to webpack bundle, add it to this whitelist
// READ MORE:
let whiteListedModules = [];

module.exports = {
    srcDir: path.join(__dirname, '..', 'src', 'renderer'),
    rootDir: path.join(__dirname, '..'),
    mode: isProduction ? 'universal' : 'spa',
    head: {title: 'Electron-vue'},
    loading: false,
    router: {
        mode: 'hash'
    },
    dev: !isProduction,
    generate:{
        dir: path.join(__dirname, '..', 'dist', 'renderer'),
    },
    plugins: [
        { ssr: false, src: path.join(__dirname, 'resources.js') }
    ],
    build: {
        extend (config, { isDev, isClient }) {

            config.externals = [
                ...Object.keys(dependencies || {}).filter(d => !whiteListedModules.includes(d))
            ];

            if(isClient) config.target = 'electron-renderer';

            config.node =  {
                __dirname: !isProduction,
                __filename: !isProduction
            };


            if (!isDev) {
                // absolute path to files on production (default value: '/_nuxt/')
                config.output.publicPath = '_nuxt/';
            }


            config.plugins.push(
                new webpack.DefinePlugin({
                    'INCLUDE_RESOURCES_PATH': resourcesPath.renderedProcess()
                })
            )

        }
    },
};
