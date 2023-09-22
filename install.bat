@echo off

start "React App" cmd /k "cd ems && npm i --legacy-peer-deps"
start "Express App" cmd /k "cd server && npm i"
