'use strict'
const fs = require('fs');
const path = require('path');

const isCIServer = process.env.CI
const TEST_SUITE = process.env.TEST_SUITE

if (isCIServer && TEST_SUITE === undefined) {
  throw new Error('You must provide TEST_SUITE env variable to run test')
}
const scenario = isCIServer && require('./tests/scenarios')[TEST_SUITE]

const CITestsFilters = require('./tests/vue-cli-filters')
const hbsHelpers = require('./hbs-helpers')

module.exports = {
  // https://github.com/vuejs-templates/webpack/blob/develop/meta.js
  metalsmith: {
    before: (metalsmith) => {
      Object.assign(
        metalsmith.metadata(),
        {
          isCIServer: isCIServer,
          isNotTest: !isCIServer
        },
        isCIServer ? scenario : {}
      )
    }
  },
  prompts: {
    name: {
      when: 'isNotTest',
      type: 'string',
      required: true,
      message: 'Application Name',
      default: 'Electron app'
    },
    appid: {
      when: 'isNotTest',
      type: 'string',
      required: true,
      message: 'Application Id',
      default: 'com.example.app'
    },
    description: {
      when: 'isNotTest',
      type: 'string',
      required: false,
      message: 'Project description',
      default: 'An electron-nuxt project'
    },
    author: {
      when: 'isNotTest',
      type: 'string',
      message: 'Author'
    },
    cssFramework: {
      when: 'isNotTest',
      type: 'list',
      message: 'Select which ui-components framework install',
      choices: [
        {
          name: 'none',
          value: 'none',
          short: 'none'
        },
        {
          name: 'Vuetify (https://vuetifyjs.com)',
          value: 'vuetify',
          short: 'Vuetify'
        },
        {
          name: 'Buefy (https://buefy.org)',
          value: 'buefy',
          short: 'Buefy'
        },
        {
          name: 'Element (https://element.eleme.io)',
          value: 'element',
          short: 'Element'
        }
      ]
    },
    cssPreprocessor: {
      when: 'isNotTest',
      type: 'list',
      message: 'Select which css pre-processor install',
      choices: [
        {
          name: 'none',
          value: 'none',
          short: 'none'
        },
        {
          name: 'Sass (scss)',
          value: 'sass',
          short: 'Sass'
        },
        {
          name: 'LESS',
          value: 'less',
          short: 'LESS'
        },
        {
          name: 'Stylus',
          value: 'stylus',
          short: 'Stylus'
        }
      ]
    },
    iconSet: {
      when: 'isNotTest',
      type: 'list',
      message: 'Select which icon set install',
      choices: [
        {
          name: 'none',
          value: 'none',
          short: 'none'
        },
        {
          name: 'Material Design Icon (https://materialdesignicons.com/)',
          value: 'mdi',
          short: 'Material Design Icon'
        },
        {
          name: 'Font Awesome 5 (https://fontawesome.com/icons)',
          value: 'fa5',
          short: 'Font Awesome 5'
        }
      ]
    },
    typescript: {
      when: 'isNotTest',
      type: 'confirm',
      required: true,
      message: 'Use typescript?',
      default: false,
    },
    eslint: {
      when: 'isNotTest',
      type: 'confirm',
      required: true,
      message: 'Use linting with ESLint?',
      default: false
    }
  },
  helpers: hbsHelpers,
  filters: {
    ...CITestsFilters,
    'src/renderer/tsconfig.json': 'typescript',
    'src/renderer/index.d.ts': 'typescript',
    'src/main/tsconfig.json': 'typescript',
    '.eslintrc.js': 'eslint',
    'src/renderer/plugins/buefy.js': 'cssFramework === \'buefy\' || cssFramework === \'all\'',
    'src/renderer/plugins/element.js': 'cssFramework === \'element\' || cssFramework === \'all\'',
    'src/renderer/plugins/vuetify.js': 'cssFramework === \'vuetify\' || cssFramework === \'all\'',
    'src/renderer/plugins/icons.js': 'iconSet !== \'none\''
  },
  skipInterpolation: 'node_modules/**/*',

  complete (data, { logger, chalk }) {
    const log = text => console.log('\t' + text)

    try{
      const projectDir = data.inPlace ? process.cwd() : path.join(process.cwd(), data.destDirName);
      fs.unlinkSync(path.join(projectDir, 'package.json'));
      fs.renameSync(path.join(projectDir, 'package-template.hbs'), path.join(projectDir, 'package.json'));
    }catch (e) {
      logger.log(chalk.red('Error occurred in vue-cli oncomplete function'));
      log(e);
    }

    logger.log(chalk.bold('All set. Welcome to your new electron-nuxt project! \n'))

    log(chalk.gray('Make sure to check out the documentation at'))
    log(chalk.gray.underline('https://github.com/michalzaq12/electron-nuxt#documentation \n'))

    log(chalk.yellow('To get started:'))
    if (!data.inPlace) log(`\t cd ${data.destDirName}`)
    log('\t yarn install')
    log('\t yarn dev')
  }
}
