@echo off
REM Start the btcd node and launch a web browser
echo Starting BitcoinDark daemon...
start btcd/BitcoinDarkd -conf=btcd/BitcoinDark.conf
echo Starting BitcoinDark node.js...
npm install supervisor -g
start /min supervisor app.js
timeout 5 > NUL
echo Launching Wallet...
start "" http://127.0.0.1:8080/
exit