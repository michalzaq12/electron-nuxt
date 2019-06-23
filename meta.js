'use strict';

const IS_CI = process.env.CI;

module.exports = {
    metalsmith: {
      before: (metalsmith, options, helpers) =>{
          Object.assign(
              metalsmith.metadata(),
              {isCI: IS_CI}
          )
      }
    },
    prompts: {
        name: {
            type: 'string',
            required: true,
            message: 'Application Name',
            default: 'your-app'
        },
        appid: {
            type: 'string',
            required: true,
            message: 'Application Id',
            default: 'com.example.yourapp'
        },
        appver: {
            type: 'string',
            required: true,
            message: 'Application Version',
            default: '0.0.1'
        },
        description: {
            type: 'string',
            required: false,
            message: 'Project description',
            default: 'An electron-nuxt project'
        },
        cssFramework: {
            type: 'list',
            message: 'Select which css framework install',
            choices: [
                {
                    name: 'none (configure it yourself)',
                    value: 'none',
                    short: 'none'
                },
                {
                    name: 'Vuetify (https://github.com/vuetifyjs/vuetify)',
                    value: 'vuetify',
                    short: 'Vuetify'
                },
                {
                    name: 'Buefy (https://github.com/buefy/buefy)',
                    value: 'buefy',
                    short: 'Buefy'
                }
            ]
        },
        cssPreprocessor: {
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
          type: 'list',
          message: 'Select with icon set install',
          choices: [
              {
                  name: 'none',
                  value: 'none',
                  short: 'none'
              },
              {
                  name: 'Material Design Icon',
                  value: 'mdi',
                  short: 'Material Icon'
              },
              {
                  name: 'Font Awesome 5',
                  value: 'fa5',
                  short: 'Font Awesome 5'
              }
          ]
        },
        eslint: {
            type: 'confirm',
            require: true,
            message: 'Use linting with ESLint?',
            default: true
        },
        eslintConfig: {
            when: 'eslint',
            type: 'list',
            message: 'Which ESLint config would you like to use?',
            choices: [
                {
                    name: 'Standard (https://github.com/feross/standard)',
                    value: 'standard',
                    short: 'Standard'
                },
                {
                    name: 'Airbnb (https://github.com/airbnb/javascript)',
                    value: 'airbnb',
                    short: 'Airbnb'
                },
                {
                    name: 'none (configure it yourself)',
                    value: 'none',
                    short: 'none'
                }
            ]
        },
        unit: {
            type: 'confirm',
            message: 'Set up unit testing with vue-test-utils + AVA?',
            required: true
        },
        e2e: {
            type: 'confirm',
            message: 'Set up end-to-end testing with Spectron + AVA?',
            require: true
        }
    },
    helpers: {
        isEnabled (list, check, opts) {
            if (list[check]) return opts.fn(this)
            else return opts.inverse(this)
        },
        testing (unit, e2e, opts) {
            if (unit || e2e) {
                return opts.fn(this)
            }
        }
    },
    filters: {
        'src/renderer/plugins/buefy.js': 'cssFramework === \'buefy\'',
        'src/renderer/plugins/vuetify.js': 'cssFramework === \'vuetify\'',
        'test/e2e/**/*': 'e2e',
        'test/unit/**/*': 'unit',
        'ava.config.js': 'e2e || unit',
        'test/.eslintrc': 'e2e || unit',
        '.eslintignore': 'eslint',
        '.eslintrc.js': 'eslint'
    },
    complete (data) {
        console.log('---------------------------------------------------------------------');
        console.log('All set. Welcome to your new electron-nuxt project!');
        console.log('Make sure to check out the documentation for this boilerplate at');
        console.log('https://github.com/michalzaq12/electron-nuxt#documentation');
        console.log('\n');
        console.log('\t Next Steps:');
        console.log(`\t cd ${data.destDirName}`)
        console.log('\t npm install');
        console.log('\t npm run dev');

    }
};