'use strict';

const projectDir = process.env.TRAVIS_BUILD_DIR;
const templateName = process.argv[2];

const suppose = require('suppose');
const cliAnswers = require('./cli-answers')[templateName];

const YELLOW = '\x1b[33m';
const END = '\x1b[0m';

process.chdir(process.cwd() + '/builds');

generate(templateName, cliAnswers);

setTimeout(() => {
    console.error('Project scaffolding timeout !')
    process.exit(1)
}, 10000)

function generate (templateName, answers) {
    console.log(`${YELLOW}Generating \`${templateName}\`${END}`);

    suppose('vue', ['init', `${projectDir}`, templateName], { debug: process.stdout })
        .when(/Application Name/g).respond(answers.name)
        .when(/Application Id/g).respond(answers.appid)
        .when(/Application Version/g).respond(answers.appver)
        .when(/Project description/g).respond(answers.description)
        .when(/css framework/g).respond(answers.cssFramework)
        .when(/css pre-processor/g).respond(answers.cssPreprocessor)
        .when(/icon set/g).respond(answers.iconSet)
        .when(/ESLint/g).respond(answers.eslint)
        .when(/config/g).respond(answers.eslintConfig)
        .when(/unit/g).respond(answers.unit)
        .when(/end-to-end/g).respond(answers.e2e)
        .when(/author/g).respond(answers.author)
        .on('error', err => {
            console.log(err.message)
        })
        .end(code => {
            process.exit(code)
        })
}
