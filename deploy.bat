@echo off

setlocal enableextensions

REM  check if yarn is installed
where /q yarn
set "has_yarn=%errorlevel%"

REM  change working directory to the script directory
cd %~dp0

cd client

if %has_yarn% equ 1 (
    if not exist "yarn.lock" (
        REM  generate yarn.lock
        yarn import > nul || goto :error
    )

    REM  install dependencies
    call yarn > nul || goto :error

    REM  transpile client source with babel
    call yarn build > nul || goto :error
) else (
    call npm install > nul || goto :error
    call npm run build > nul || goto :error
)

REM  copy built source to server static source

for /f "tokens=* usebackq" %%a in (
    `robocopy "dist" "..\server\src\views" /mt /e /xd`
) do (
    set "copy_res=%errorlevel%"
)

REM  if error is fatal, terminate batch

if %copy_res% geq 8 (
    goto :error
)

cd ../server

if %has_yarn% equ 1 (
    if not exist "yarn.lock" (
        REM  generate yarn.lock
        yarn import > nul || goto :error
    )

    call yarn > nul || goto :error

    REM  run server
    call yarn serve || goto :error
) else (
    call npm install > nul || goto :error
    call npm run serve || goto :error
)

endlocal

goto :eof

:error
echo Failed execution with error code %errorlevel%
exit /b %errorlevel%
