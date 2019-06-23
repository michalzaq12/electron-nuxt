const CONFIRM = '\n';
const DEFAULT_VALUE = '\n';
const DOWN_ARROW = '\u001b[B';

const defaultValues = {
  name: DEFAULT_VALUE,
  appid: DEFAULT_VALUE,
  appver: DEFAULT_VALUE,
  description: DEFAULT_VALUE,
  cssFramework: DEFAULT_VALUE,
  cssPreprocessor: DEFAULT_VALUE,
  iconSet: DEFAULT_VALUE,
  eslint: DEFAULT_VALUE,
  eslintConfig: DEFAULT_VALUE,
  unit: DEFAULT_VALUE,
  e2e: DEFAULT_VALUE,
  author: DEFAULT_VALUE
};

module.exports = {
  default: defaultValues,
  vuetify: {
    ...defaultValues,
    cssFramework: DOWN_ARROW + CONFIRM
  },
  buefy: {
    ...defaultValues,
    cssFramework: DOWN_ARROW + DOWN_ARROW + CONFIRM
  }
};