@echo off
title InfoHub Launcher
color 0A

echo.
echo  ========================================
echo    InfoHub Application Launcher
echo  ========================================
echo.
echo  [1] Starting Backend Server...
echo.

cd server
start "InfoHub Backend - Port 3001" cmd /k "npm start"

echo  [2] Waiting 5 seconds for backend to initialize...
timeout /t 5 /nobreak > nul

echo.
echo  [3] Starting Frontend Development Server...
echo.

cd ..\client
start "InfoHub Frontend - Port 5173" cmd /k "npm run dev"

cd ..

echo.
echo  ========================================
echo   Both servers are now running!
echo  ========================================
echo.
echo   Backend:  http://localhost:3001
echo   Frontend: http://localhost:5173
echo.
echo   Two command windows will open.
echo   Close those windows to stop the servers.
echo  ========================================
echo.
echo  Press any key to exit this launcher...
pause > nul