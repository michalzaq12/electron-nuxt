#!/bin/bash
set -e

username=$(git config user.name)

if ["$username" == "depfu"] || ["$username" == "depfu[bot]"]; then
    node ./update-dependency/update.js
    git add ./template/package.json
else
    node ./update-dependency/generate.js
    git add ./update-dependency/package.json
fi




