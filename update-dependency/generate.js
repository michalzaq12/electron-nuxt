const Handlebars = require('handlebars');
const helpers = require('../hbs-helpers');
const fs = require('fs');
const path = require('path');


const hbs = Handlebars.create();

for (const [name, method] of Object.entries(helpers)) {
    hbs.registerHelper(name, method);
}


const source = fs.readFileSync(path.join(__dirname, '../template/package.json')).toString();

const template = hbs.compile(source);

const data = {
    name: 'electron-nuxt',
    appver: '0.0.1',
    description: 'An electron-nuxt project'
}

const result = template(data);

const json = JSON.parse(result);

fs.writeFileSync(path.join(__dirname, 'package.json'), JSON.stringify(json, null, 2));
fs.copyFileSync(path.join(__dirname, '../template/package-lock.json'), path.join(__dirname, 'package-lock.json'))

