process.env.BABEL_ENV = 'renderer';
const isProduction = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';
const path = require('path');
const { dependencies } = require('../../package.json')
const webpack = require('webpack');
const resourcesPath = require('../resources-path-provider');
const {RENDERER_PROCESS_DIR, DIST_DIR, PROJECT_ROOT} = require('../config');

const userNuxtConfig = require('../../src/renderer/nuxt.config');

// By default all dependencies (not devDependencies) from package.json are excluded from webpack bundle,
// however, they are still available (without any transformation) in renderer process.
// If you really need to add dependency to webpack bundle, add it to this whitelist
// READ MORE:
let whiteListedModules = [];

module.exports = {
    ...userNuxtConfig,
    srcDir: RENDERER_PROCESS_DIR,
    rootDir: PROJECT_ROOT,
    router: {
        mode: 'hash'
    },
    dev: isDev,
    generate:{
        dir: path.join(DIST_DIR, 'renderer')
    },
    plugins: [
        { ssr: true, src: path.join(__dirname, 'resources-plugin.js') },
        ...(userNuxtConfig.plugins || [])
    ],
    build: {
        extend (config, { isClient }) {

            if(userNuxtConfig.build !== undefined && userNuxtConfig.build.extend !== undefined){
                userNuxtConfig.build.extend(...arguments)
            }

            config.externals = [
                ...Object.keys(dependencies || {}).filter(d => !whiteListedModules.includes(d))
            ];

            config.target = 'electron-renderer';

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
                    'INCLUDE_RESOURCES_PATH': isClient ? resourcesPath.nuxtClient() : resourcesPath.nuxtServer()
                })
            )

        }
    },
};


