# change working directory to the script directory
cd $PSScriptRoot

# go to client source
cd client

# transpile client source with babel
npm run build

# copy built source to server static source
robocopy dist ..\server\src\views /MT /E /XD

# go to server source
cd ../server

# run server
npm run serve
