var btcd = require('node-btcd')();
btcd.auth('rpcuser', 'rpcpass');

module.exports = btcd;

