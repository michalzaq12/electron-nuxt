#!/bin/bash
set -e

cd "$PWD/tests"

# Clean up dir if exist
if [[ -d "$1" ]]; then rm -Rf $1; fi

# Scaffold boilerplate with given templateName
node scaffold.js "$1"
sleep .5


# Install dependencies
cd "$PWD/builds/$1"
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

