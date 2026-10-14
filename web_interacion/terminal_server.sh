#!/usr/bin/env bash

cd "$(dirname "$0")/.." || exit 1
python -m http.server 8000