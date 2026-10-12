@echo off
chcp 65001 > nul
echo ========================================================
echo    📱 بناء تطبيق أندرويد APK - ECOM SPEED PRO
echo ========================================================
echo جاري تجميع حزمة الأندرويد APK الآن...
cd /d "%~dp0\flutter_app"
if exist "C:\src\flutter\bin\flutter.bat" (
    C:\src\flutter\bin\flutter.bat build apk --release
) else (
    flutter build apk --release
)
echo.
echo تم الانتهاء! ستجد ملف الـ APK في: flutter_app\build\app\outputs\flutter-apk\app-release.apk
pause
