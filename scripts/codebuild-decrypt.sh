#!/bin/bash

echo $CODEBUILD_SRC_DIR

cd /tmp
curl -Lo git-crypt.zip https://github.com/AGWA/git-crypt/archive/master.zip
unzip git-crypt.zip
cd git-crypt-master
make
make install

cd $CODEBUILD_SRC_DIR
git init
git config user.email "build@cxcloud.com"
git config user.name "CXCloud"
git add . && git commit -m "Initial"
openssl aes-256-cbc -d -a -in git-crypt.key.enc -out git-crypt.key -pass pass:"$GITCRYPT_PASS"
git-crypt unlock git-crypt.key
rm git-crypt.key
rm -rf .git
