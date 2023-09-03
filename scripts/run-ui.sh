#!/bin/bash

build() {
  pnpm -C ui build
}

if [ "$1" == "build" ]; then
  build
  exit 0
fi

dev() {
  pnpm -C ui dev
}

if [ "$1" == "dev" ]; then
  dev
  exit 0
fi