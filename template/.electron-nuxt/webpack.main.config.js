'use strict';
process.env.BABEL_ENV = 'main';

const path = require('path');
const { dependencies } = require('../package.json');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';
const isProduction =  process.env.NODE_ENV === 'production';



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
                use: 'babel-loader',
                exclude: /node_modules/
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
        new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve: {
        extensions: ['.js', '.json', '.node']
    },
    target: 'electron-main'
};

/**
 * Adjust mainConfig for development settings
 */
if (isDev) {
    mainConfig.plugins.push(
        new webpack.DefinePlugin({
            '__resources': JSON.stringify(path.join(__dirname, '..', 'resources'))
        })
    )
}

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