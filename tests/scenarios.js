const NONE = 'none'

const defaultValues = {
  name: 'your-app',
  appid: 'com.example.yourapp',
  appver: '0.0.1',
  description: 'An electron-nuxt project',
  cssFramework: NONE,
  cssPreprocessor: NONE,
  iconSet: NONE,
  typescript: false,
  eslint: false,
  eslintConfig: NONE,
  author: 'CI user'
}

const scenarios = {
  default: defaultValues,
  eslint: {
    ...defaultValues,
    eslint: true
  },
  typescript: {
    ...defaultValues,
    unit: false,
    typescript: true
  },
  loaders: {
    ...defaultValues,
    cssPreprocessor: 'all'
  },
  css_frameworks: {
    ...defaultValues,
    cssFramework: 'all'
  }
}

module.exports = scenarios
