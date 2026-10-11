@echo off
chcp 65001 >nul
title ECOM SPEED PRO - لوحة تحكم الإدارة الفاخرة

echo ========================================================
echo    🚀 جاري تشغيل برنامج لوحة تحكم ECOM SPEED PRO المستقل...
echo ========================================================

cd /d "%~dp0desktop-app"

if exist "node_modules\.bin\electron.cmd" (
    start "" "node_modules\.bin\electron.cmd" .
) else (
    start "" npx electron .
)

exit
