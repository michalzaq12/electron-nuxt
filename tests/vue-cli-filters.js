const TEST_SUITE = process.env.TEST_SUITE
module.exports = {
  'src/renderer/pages/test/**/*': 'isCIServer',

  'src/renderer/pages/test/css-framework/**/*': TEST_SUITE === 'css_frameworks',
  'test/e2e/specs/css-framework.spec.js': TEST_SUITE === 'css_frameworks',

  'src/renderer/pages/test/loader/**/*': TEST_SUITE === 'loaders',
  'test/e2e/specs/loader.spec.js': TEST_SUITE === 'loaders',

  'src/renderer/pages/test/typescript/**/*': TEST_SUITE === 'typescript',
}
