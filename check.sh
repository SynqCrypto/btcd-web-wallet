#!/bin/sh
btcd=$(ps aux | grep BitcoinDarkd | grep -v 'grep' | grep -c 'BitcoinDarkd')
btcdqt=$(ps aux | grep BitcoinDark-Qt | grep -v 'grep' | grep -c 'BitcoinDark-Qt')
if  [ "$btcd" = "1" -o $btcdqt = "1" ]; then
echo "1"
else
echo "0"
fi
