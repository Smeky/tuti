#!/usr/bin/env bash

cd ./lib/modules/

for d in */ ; do
    yarn --cwd $d install
done
