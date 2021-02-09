#!/bin/sh

# check if yarn is insdtalled
YARN_INSTALLED=$(which yarn)

# change working directory to the script directory
cd "$(dirname "$0")"

cd client

if [ $YARN_INSTALLED ]; then
  # install dependencies
  yarn --frozen-lock > /dev/null || exit 1
  # transpile client source with babel
  yarn build > /dev/null || exit 1
else
  npm install > /dev/null || exit 1
  npm run build > /dev/null || exit 1
fi

# copy built source to server static source
cp -r "dist" "../server/src/views"

cd ../server

if [ $YARN_INSTALLED ]; then
  # install dependencies
  yarn --frozen-lock > /dev/null || exit 1
  # run server
  yarn serve || exit 1
else
  npm install > /dev/null || exit 1
  npm run serve || exit 1
fi
