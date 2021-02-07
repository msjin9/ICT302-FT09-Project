# change working directory to the script directory
cd $PSScriptRoot

# go to client source
cd client

# transpile client source with babel
npm run build

# copy built source to server static source
Copy-Item -Path "dist" -Destination "..\server\src\views" -Recurse

# go to server source
cd ../server

# run server
npm run serve
