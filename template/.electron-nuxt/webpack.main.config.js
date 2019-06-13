'use strict';
process.env.BABEL_ENV = 'main';

const path = require('path');
const { resourcesPath } = require('./config');
const { dependencies } = require('../package.json');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';
const isProduction =  process.env.NODE_ENV === 'production';

const {SERVER_PORT, SERVER_HOST} = require('./config');

let mainConfig = {
    mode: isDev ? 'development' : 'production',
    entry: {
        main: isDev ?
            path.join(__dirname, '../src/main/index.dev.js')
            : path.join(__dirname, '../src/main/index.js')
    },
    externals: [
        ...Object.keys(dependencies || {})
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/env', {
                                targets: ['electron 4.0']
                            }]
                        ]
                    }
                }
            },
            {
                test: /\.node$/,
                use: 'node-loader'
            }
        ]
    },
    node: {
        __dirname: !isProduction,
        __filename: !isProduction
    },
    output: {
        filename: 'index.js',
        libraryTarget: 'commonjs2',
        path: path.join(__dirname, '../dist/main')
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'INCLUDE_RESOURCES_PATH': resourcesPath.mainProcess(),
            'process.env.DEV_SERVER_URL': `'${SERVER_HOST}:${SERVER_PORT}'`
        })
    ],
    resolve: {
        extensions: ['.js', '.json', '.node']
    },
    target: 'electron-main'
};


/**
 * Adjust mainConfig for production settings
 */
if (isProduction) {
    mainConfig.plugins.push(
        //new BabiliWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        })
    )
}

module.exports = mainConfig;