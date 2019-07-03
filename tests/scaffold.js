'use strict';

const projectDir = process.env.TRAVIS_BUILD_DIR;
const templateName = process.argv[2];

const suppose = require('suppose');
const scenario = require('./scenarios')[templateName];

const YELLOW = '\x1b[33m';
const END = '\x1b[0m';

process.chdir(process.cwd() + '/builds');

generate(templateName, scenario);

if(process.env.CI) console.log(`${YELLOW}CI build detected.${END}`);

setTimeout(() => {
    console.error('Project scaffolding timeout !')
    process.exit(1)
}, 10000)

function generate (templateName, scenario) {
    console.log(`${YELLOW}Generating \`${templateName}\`${END}`);

    suppose('vue', ['init', `${projectDir}`, templateName], { debug: process.stdout })
        .when(/Application Name/g).respond(scenario.name)
        .when(/Application Id/g).respond(scenario.appid)
        .when(/Application Version/g).respond(scenario.appver)
        .when(/Project description/g).respond(scenario.description)
        .when(/ui-components/g).respond(scenario.cssFramework)
        .when(/css pre-processor/g).respond(scenario.cssPreprocessor)
        .when(/icon set/g).respond(scenario.iconSet)
        .when(/ESLint/g).respond(scenario.eslint)
        .when(/config/g).respond(scenario.eslintConfig)
        .when(/unit/g).respond(scenario.unit)
        .when(/end-to-end/g).respond(scenario.e2e)
        .when(/author/g).respond(scenario.author)
        .on('error', err => {
            console.log(err.message)
        })
        .end(code => {
            process.exit(code)
        })
}
