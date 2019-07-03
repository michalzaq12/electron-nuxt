'use strict';

const isCIServer = process.env.CI;
const TEST_SUITE = process.env.TEST_SUITE;

if(isCIServer && TEST_SUITE === undefined){
    throw new Error('You must provide TEST_SUITE env variable to run test');
}
const scenario = isCIServer && require(`./tests/scenarios`)[TEST_SUITE];

module.exports = {
    //https://github.com/vuejs-templates/webpack/blob/develop/meta.js
    metalsmith: {
      before: (metalsmith) =>{
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
            default: 'your-app'
        },
        appid: {
            when: 'isNotTest',
            type: 'string',
            required: true,
            message: 'Application Id',
            default: 'com.example.yourapp'
        },
        appver: {
            when: 'isNotTest',
            type: 'string',
            required: true,
            message: 'Application Version',
            default: '0.0.1'
        },
        description: {
            when: 'isNotTest',
            type: 'string',
            required: false,
            message: 'Project description',
            default: 'An electron-nuxt project'
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
        eslint: {
            when: 'isNotTest',
            type: 'confirm',
            require: true,
            message: 'Use linting with ESLint?',
            default: false
        },
        eslintConfig: {
            when: 'isNotTest && eslint',
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
            when: 'isNotTest',
            type: 'confirm',
            message: 'Set up unit testing with vue-test-utils + AVA?',
            required: true,
            default: false
        },
        e2e: {
            when: 'isNotTest',
            type: 'confirm',
            message: 'Set up end-to-end testing with Spectron + AVA?',
            require: true,
            default: false
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

    },
    complete (data) {

        const YELLOW = '\x1b[33m';
        const END = '\x1b[0m';

        console.log(`${YELLOW}─────────────────────────────────────────────────────────────────────${END}`);
        console.log('All set. Welcome to your new electron-nuxt project!');
        console.log('Make sure to check out the documentation for this boilerplate at');
        console.log(`${YELLOW}https://github.com/michalzaq12/electron-nuxt#documentation${END}`);
        console.log(`${YELLOW}─────────────────────────────────────────────────────────────────────${END}`);
        console.log('\t Next Steps:');
        console.log(`\t cd ${data.destDirName}`)
        console.log('\t npm install');
        console.log('\t npm run dev');

    }
};