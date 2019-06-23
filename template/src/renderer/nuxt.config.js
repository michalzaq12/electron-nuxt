/**
 * By default, Nuxt.js is configured to cover most use cases.
 * This default configuration can be overwritten in this file
 * @link {https://nuxtjs.org/guide/configuration/}
 */


module.exports = {
    head: {
        title: 'Electron-nuxt'
    },
    loading: false,
    plugins: [
        {ssr: true, src: '@/plugins/buefy.js'}
    ]
};