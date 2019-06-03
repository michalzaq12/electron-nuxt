process.env.BABEL_ENV = 'renderer'
const path = require('path');
const { dependencies } = require('../package.json')
const webpack = require('webpack')

let whiteListedModules = ['nuxt']

module.exports = {
    srcDir: path.join(__dirname, '..', 'src', 'renderer'),
    rootDir: path.join(__dirname, '..'),
    mode: process.env.NODE_ENV === 'development' ? 'spa' : 'universal',
    head: {title: 'Electron-vue'},
    loading: false,
    dev: process.env.NODE_ENV === 'development',
    generate:{
        dir: path.join(__dirname, '..', 'dist', 'electron'),
    },
    build: {
        extend (config, { isDev, isClient }) {

            // config.externals = [
            //     ...Object.keys(dependencies || {}).filter(d => !whiteListedModules.includes(d))
            // ];

            if(isClient) config.target = 'electron-renderer'

            config.node =  {
                __dirname: process.env.NODE_ENV !== 'production',
                __filename: process.env.NODE_ENV !== 'production'
            };

            // if (!isDev) {
            //     // relative links, please.
            //     config.output.publicPath = '../_nuxt/'
            // }

            /**
             * Adjust rendererConfig for development settings
             */
            if (process.env.NODE_ENV !== 'production') {
                config.plugins.push(
                    new webpack.DefinePlugin({
                        '__static': `"${path.join(__dirname, '../static').replace(/\\/g, '\\\\')}"`
                    })
                )
            }
        }
    },
};
