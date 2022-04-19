#!/bin/sh
set -e

echo 'Installing deps' && yarn install &&

exec "$@"