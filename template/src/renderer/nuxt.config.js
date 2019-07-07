/**
 * By default, Nuxt.js is configured to cover most use cases.
 * This default configuration can be overwritten in this file
 * @link {https://nuxtjs.org/guide/configuration/}
 */


module.exports = {
  mode: 'spa', // or 'universal'
  head: {
    title: '{{name}}'
  },
  loading: false,
  plugins: [
    {{#unless_eq iconSet 'none'}}{ssr: true, src: '@/plugins/icons.js'},{{/unless_eq}}
    {{#if_eq cssFramework 'buefy'}}{ssr: true, src: '@/plugins/buefy.js'},{{/if_eq}}
    {{#if_eq cssFramework 'vuetify'}}{ssr: true, src: '@/plugins/vuetify.js'},{{/if_eq}}
    {{#if_eq cssFramework 'element'}}{ssr: true, src: '@/plugins/element.js'},{{/if_eq}}
  ]
};
