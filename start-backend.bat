@echo off
cd /d "%~dp0backend"
echo Starting CineVault backend...
node server.js
pause
