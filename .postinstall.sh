#!/usr/bin/env bash

cd ./lib/utilities/

for d in */ ; do
    yarn --cwd $d install
done
