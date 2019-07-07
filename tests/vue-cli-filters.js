module.exports = {
  'src/renderer/pages/test/**/*': 'isCIServer',

  'src/renderer/pages/test/css-framework/buefy.vue': 'cssFramework === \'buefy\'',
  'src/renderer/pages/test/css-framework/vuetify.vue': 'cssFramework === \'vuetify\'',
  'src/renderer/pages/test/css-framework/element.vue': 'cssFramework === \'element\'',
  'src/renderer/pages/test/loader/less.vue': 'cssPreprocessor === \'less\'',
  'src/renderer/pages/test/loader/sass.vue': 'cssPreprocessor === \'sass\'',
  'src/renderer/pages/test/loader/stylus.vue': 'cssPreprocessor === \'stylus\'',

  'test/e2e/spec/css-framework.spec.js': 'isCIServer',
  'test/e2e/spec/loader.spec.js': 'isCIServer'
}
