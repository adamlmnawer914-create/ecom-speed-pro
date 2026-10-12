@echo off
chcp 65001 > nul
echo ========================================================
echo    🚀 تشغيل تطبيق ECOM SPEED PRO (Flutter)
echo ========================================================
echo جاري بدء تشغيل التطبيق في المتصفح فورا...
cd /d "%~dp0\flutter_app"
if exist "C:\src\flutter\bin\flutter.bat" (
    C:\src\flutter\bin\flutter.bat run -d chrome
) else (
    flutter run -d chrome
)
pause
