@echo off

REM  change working directory to the script directory
cd %~dp0

REM  go to client source
cd client

REM  install dependencies
npm ci

REM  transpile client source with babel
call npm run build

REM  copy built source to server static source
robocopy dist ..\server\src\views /MT /E /XD

REM  go to server source
cd ../server

REM  install dependencies
npm ci

REM  run server
npm run serve
