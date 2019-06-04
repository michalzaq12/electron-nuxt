/**
 * Set `__resources` path to resources files in renderer process
 * nuxt bundles: ./dist/electron/_nuxt/
 * resources: ./resources/
 */
if (process.env.NODE_ENV !== 'development') {
    global.__resources = require('path').join(__dirname, '..', '..', 'resources')
}