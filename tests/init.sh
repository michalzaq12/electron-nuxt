#!/bin/bash
set -e

# Scaffold boilerplate
printf "Yes" | vue init . ./generated_template
sleep .5


# Install dependencies
cd "$PWD/generated_template"
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

