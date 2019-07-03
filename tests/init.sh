#!/bin/bash
set -e

# Scaffold boilerplate
# "Y" -> vue cli will ask you if yot want to override existing directory
printf "Y" | vue init . ./tests/generated_template
sleep .5


# Install dependencies
cd "$PWD/tests/generated_template"
npm install


# Run webpack and build application
npm run build


# Configure virtual display server on linux os
if [[ "$TRAVIS_OS_NAME" == "linux" ]]; then
    export DISPLAY=:99.0
    sh -e /etc/init.d/xvfb start
    sleep 3 # give xvfb some time to start
fi

# Run e2e testing
npm run test:e2e

