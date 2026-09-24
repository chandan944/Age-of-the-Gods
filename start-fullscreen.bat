@echo off
title Age of the Gods - Fullscreen Launcher
echo ========================================================
echo   Age of the Gods: Launching in Fullscreen (No URL Bar)
echo ========================================================

start /b node server.js
timeout /t 1 /nobreak >nul

where chrome >nul 2>nul
if %errorlevel% equ 0 (
    start "" chrome --app="http://localhost:8080" --start-fullscreen
    exit /b
)

if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
    start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" --app="http://localhost:8080" --start-fullscreen
    exit /b
)

if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" (
    start "" "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" --app="http://localhost:8080" --start-fullscreen
    exit /b
)

if exist "%LocalAppData%\Google\Chrome\Application\chrome.exe" (
    start "" "%LocalAppData%\Google\Chrome\Application\chrome.exe" --app="http://localhost:8080" --start-fullscreen
    exit /b
)

start "" "http://localhost:8080"
