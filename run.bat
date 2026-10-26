@echo off
title BrandX Blog Server
echo ========================================================
echo   BrandX Responsive Blog - UI vs UX
echo ========================================================
echo Starting local HTTP server on http://localhost:8080/ ...
echo Opening in default web browser...

start "" "http://localhost:8080/"
powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
