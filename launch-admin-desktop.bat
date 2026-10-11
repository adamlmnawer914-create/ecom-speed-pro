@echo off
taskkill /f /im electron.exe >nul 2>&1
cd /d "%~dp0desktop-app"
if exist "node_modules\electron\dist\electron.exe" (
    start "" "node_modules\electron\dist\electron.exe" .
) else if exist "node_modules\.bin\electron.cmd" (
    start "" "node_modules\.bin\electron.cmd" .
) else (
    start "" npx electron .
)
exit
