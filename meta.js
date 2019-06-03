'use strict';

module.exports = {
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
            default: 'An electron-vue project'
        },
        usesass: {
            type: 'confirm',
            message: 'Use Sass / Scss?',
            required: true
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
            message: 'Set up unit testing with Karma + Mocha?',
            required: true
        },
        e2e: {
            type: 'confirm',
            message: 'Set up end-to-end testing with Spectron + Mocha?',
            require: true
        }
    },
    helpers: {
        isEnabled (list, check, opts) {
            if (list[check]) return opts.fn(this)
            else return opts.inverse(this)
        },
        deps (plugins) {
            let output = ''
            let dependencies = {
                'axios': '^0.18.0',
                'vue-electron': '^1.0.6',
                'vue-router': '^3.0.1',
                'vuex': '^3.0.1',
                'vuex-electron': '^1.0.0'
            }

            if (Object.keys(plugins).length > 0) output += ',\n'

            Object.keys(plugins).forEach((p, i) => {
                output += `    "${p}": "${dependencies[p]}"`
                if (i !== Object.keys(plugins).length - 1) output += ',\n'
            })

            return output
        },
        testing (unit, e2e, opts) {
            if (unit || e2e) {
                return opts.fn(this)
            }
        }
    },
    filters: {
        'src/renderer/routes.js': 'plugins[\'vue-router\']',
        'src/renderer/components/LandingPageView/CurrentPage.vue': 'plugins[\'vue-router\']',
        'src/renderer/router/**/*': 'plugins[\'vue-router\']',
        'src/renderer/store/**/*': 'plugins[\'vuex\']',
        'test/e2e/**/*': 'e2e',
        'test/unit/**/*': 'unit',
        '.electron-vue/build.config.js': 'builder === \'packager\'',
        'test/.eslintrc': 'e2e || unit',
        '.eslintignore': 'eslint',
        '.eslintrc.js': 'eslint',
        'appveyor.yml': 'builder === \'builder\'',
        '.travis.yml': 'builder === \'builder\''
    },
    complete (data) {

        console.log('All set. Welcome to your new electron-vue project!');
        console.log('Make sure to check out the documentation for this boilerplate at');
        console.log('https://simulatedgreg.gitbooks.io/electron-vue/content');
        console.log('Next Steps:');
        console.log('\t yarn (or `npm install`)');
        console.log('\t yarn run dev (or `npm run dev`)');

    }
};