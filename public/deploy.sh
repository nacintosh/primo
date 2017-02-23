#!/usr/bin/env bash

set -e
set -u

readonly ROOT_DIR=$(cd $(dirname ${BASH_SOURCE:-$0}); pwd)
cd ${ROOT_DIR}/storage && gsutil cp -a public-read ./bundle.js gs://primo_js/
cd ${ROOT_DIR}/functions/listen && npm install && npm run deploy
