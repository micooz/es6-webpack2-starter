#!/usr/bin/env bash

BIN=node_modules/.bin

NODE_ENV=development ${BIN}/webpack-dev-server --config webpack/dev.config.js --watch
