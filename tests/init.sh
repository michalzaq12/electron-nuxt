#!/bin/bash
set -e

# Scaffold boilerplate with given templateName
cd "$PWD/tests"
node scaffold.js "$1"
sleep .5


# Install dependecies
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


# Clean up current scaffold
cd ..
rm -rf "$1"