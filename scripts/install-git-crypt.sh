#!/bin/bash
set -ev
set -o pipefail

cd /tmp
curl -Lo git-crypt.zip https://github.com/AGWA/git-crypt/archive/master.zip
unzip git-crypt.zip
cd git-crypt-master
make
install git-crypt $TRAVIS_BUILD_DIR
cd $TRAVIS_BUILD_DIR
openssl aes-256-cbc -K $encrypted_bb5bb77d3466_key -iv $encrypted_bb5bb77d3466_iv -in git-crypt.key.enc -out git-crypt.key -d
git stash
./git-crypt unlock git-crypt.key
rm git-crypt.key
