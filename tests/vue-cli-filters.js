const TEST_SUITE = process.env.TEST_SUITE
module.exports = {
  'src/renderer/pages/test/**/*': 'isCIServer',

  'src/renderer/pages/test/css-framework/**/*': TEST_SUITE === 'css_frameworks',
  'test/e2e/spec/css-framework.spec.js': TEST_SUITE === 'css_frameworks',

  'src/renderer/pages/test/loader/**/*': process.env.TEST_SUITE === 'loaders',
  'test/e2e/spec/loader.spec.js': process.env.TEST_SUITE === 'loaders',

  'src/renderer/pages/test/typescript/**/*': process.env.TEST_SUITE === 'typescript',
  //TODO add e2e typescript test
}
