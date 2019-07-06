const { dependencies, devDependencies} = require('./package');
const fs = require('fs');
const path = require('path');

let mainPackageFile = fs.readFileSync(path.join(__dirname, '../template/package.json')).toString();


function updateDependency(name, ver) {
    const dependencyRegistry = `"${name}": "${ver}"`;
    if(mainPackageFile.includes(dependencyRegistry)) return;
    const dependencyRegistryRegexp = new RegExp(`"${name}": ".*"`);
    mainPackageFile = mainPackageFile.replace(dependencyRegistryRegexp, dependencyRegistry);
}


for(const [name, ver] of Object.entries(dependencies || {})){
    updateDependency(name,ver);
}

for(const [name, ver] of Object.entries(devDependencies || {})){
    updateDependency(name,ver);
}


fs.writeFileSync(path.join(__dirname, '../template/package.json'), mainPackageFile);