@echo off
chcp 65001 >nul
title ECOM SPEED PRO - لوحة تحكم الإدارة الفاخرة

echo ========================================================
echo    جاري تشغيل لوحة تحكم ECOM SPEED PRO المستقلة...
echo ========================================================

cd /d "%~dp0desktop-app"

:: تشغيل البرنامج كنافذة سطح مكتب مستقلة وفاخرة
start "" npx electron .

if %ERRORLEVEL% NEQ 0 (
    start "" msedge --app=https://ecom-speed-pro.vercel.app/admin --window-size=1480,940
)

exit
