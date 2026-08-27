@echo off
title AstraCore Technologies - Portfolio & Website Runner
color 0b
cls

echo ======================================================================
echo           ASTRACORE TECHNOLOGIES - SILICON SAVANNAH SUITE
echo ======================================================================
echo.
echo [1] Launch Development Server (Hot Reload / Fast Iteration)
echo [2] Compile and Export Static Website (Production Build)
echo [3] Install Project Dependencies (npm install)
echo [4] Exit
echo.
echo ======================================================================
set /p opt="Enter choice [1-4]: "

if "%opt%"=="1" goto dev
if "%opt%"=="2" goto build
if "%opt%"=="3" goto install
if "%opt%"=="4" goto exit
goto invalid

:dev
cls
echo Starting local development server...
echo Access it at http://localhost:3000
echo ======================================================================
npm run dev
pause
goto exit

:build
cls
echo Compiling and exporting production-ready static bundle...
echo This generates optimized HTML, CSS and JS in the "out" folder.
echo ======================================================================
npm run build
echo.
echo Build complete. Files are ready inside the "out" directory.
pause
goto exit

:install
cls
echo Installing NPM dependencies...
echo ======================================================================
npm install
echo.
echo Installation finished.
pause
goto exit

:invalid
echo.
echo Invalid option selected. Please choose 1, 2, 3, or 4.
pause
goto exit

:exit
cls
echo Goodbye!
exit
