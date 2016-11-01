#!/usr/bin/env bash

BIN=node_modules/.bin

NODE_ENV=production ${BIN}/webpack --config webpack/prod.config.js --progress --display-error-details --color
