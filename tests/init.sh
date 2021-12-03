#!/bin/bash
set -e

# Scaffold boilerplate
# "Y" -> vue cli will ask you if yot want to override existing directory
printf "Y" | vue init . ./tests/generated_template
sleep .5

# Install dependencies
cd "$PWD/tests/generated_template"
npm set audit false
yarn install

# Run webpack and build application
yarn build
