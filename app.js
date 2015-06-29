
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');

var http = require('http');
var path = require('path');
var app = express();


var btcd=require("./btcdapi");


// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
console.log('BitcoinDark Node Starting');

var server = http.createServer(app).listen(app.get('port'), function(err, result){
    console.log('Express server listening on port ' + app.get('port'));
});

//app.get('/', function(req,res){
//	res.render('index');
//	});

// RPC functions //////////////

// encryptwallet not recommended
//app.get('/encryptwallet/:passphrase', function(req, res){
//	btcd.encryptwallet(req.params.passphrase, function(err, result){
//		console.log("err:"+err+" result:"+result);
//		if(err)
//			res.send(err);
//		else
//			res.send(JSON.stringify(result));
//	});
//});

app.get('/getbalance', function(req, res){
	btcd.getbalance(function(err, result){
		console.log("err:"+err+" result:"+result);
		if(err)
			res.send(err);
		else
			res.send(JSON.stringify(result));
	});
});

app.get('/getinfo', function(req, res){
	btcd.getinfo(function(err, result){
		console.log("err:"+err+" result:"+result);
		if(err)
			res.send(err);
		else
			res.send(JSON.stringify(result));
	});
});

app.get('/getnewaddress', function(req, res){
	btcd.getnewaddress(function(err, result){
		console.log("err:"+err+" result:"+result);
		if(err)
			res.send(err);
		else
			res.send(JSON.stringify(result));
	});
});

app.get('/help', function(req, res){
	btcd.help(function(err, result){
		console.log("err:"+err+" result:"+result);
		if(err)
			res.send(err);
		else
			res.send(JSON.stringify(result));
	});
});

// listaccounts is broken. use listaddressgroupings
//app.get('/listaccounts', function(req, res){
//	btcd.listaccounts(function(err, result){
//		console.log("err:"+err+" result:"+result);
//		if(err)
//			res.send(err);
//		else
//			res.send(JSON.stringify(result));
//	});
//});

app.get('/listaddressgroupings', function(req, res){
	btcd.listaddressgroupings(function(err, result){
		console.log("err:"+err+" result:"+result);
		if(err)
			res.send(err);
		else
			res.send(JSON.stringify(result));
	});
});

app.get('/listreceivedbyaddress/:minconf/:includeempty', function(req, res){
	btcd.listreceivedbyaddress(parseInt(req.params.minconf),req.params.includeempty === "true", function(err, result){
		console.log("err:"+err+" result:"+result);
		if(err)
			res.send(err);
		else
			res.send(JSON.stringify(result));
	});
});

app.get('/listtransactions', function(req, res){
	btcd.listtransactions(function(err, result){
		console.log("err:"+err+" result:"+result);
		if(err)
			res.send(err);
		else
			res.send(JSON.stringify(result));
	});
});

app.get('/sendfrom/:fromaccount/:toaddress/:amount', function(req, res){
	btcd.sendfrom(req.params.fromaccount, req.params.toaddress, parseInt(req.params.amount), function(err, result){
		console.log("err:"+err+" result:"+result);
		if(err)
			res.send(err);
		else
			res.send(JSON.stringify(result));
	});
});


// Custom functions ////////////

app.get('/totalbtcd', function(req, res){
	btcd.getinfo(function(err, result){
		console.log("err:"+err+" result:"+result);
		if(err)
			res.send(err);
		else{
			var money = result.moneysupply.toString();	
			res.send(money);
		}
	});
});

app.get('/blockcount', function(req,res){
	btcd.getinfo(function(err, result){
		console.log("err:"+err+" result:"+result);
		if(err)
			res.send(err);
		else{
			var blocks = result.blocks.toString();
			res.send(blocks);
		}
	});
});

app.get('/difficulty', function(req,res){
	btcd.getDifficulty(function(err, result){
		console.log("err:"+err+" result:"+result);
		if(err)
			res.send(err);
		else
			res.send(result);
	});
});	

app.get('/getblockhash/:index', function(req, res){
	btcd.getblockhash(parseInt(req.params.index), function(err, hash){
		if(err)
			res.send(err);
		else
			res.send(hash);
	});
});

app.get('/getblock/:hash', function(req, res){
	btcd.getblock(req.params.hash, function(err, data){
		if(err)
			res.send(err);
		else
			res.render('block', data);
	});
});


app.get('/gettx/:txid', function(req, res){
	btcd.gettransaction(req.params.txid, function(err, data){
		if(err)
			res.send("Error parsing transaction id");
		else
			res.render('tx', data);
	});
});


//SuperNET functions///////////////

app.get('/getpeers', function(req, res){
	btcd.SuperNET('{"requestType":"getpeers"}', function(err, data){
		if(err)
			console.log("err: " + err);
		else
			res.render('getpeers',{peers:JSON.parse(data).peers});
	});
});

app.get('/ramstatus', function(req, res){
	btcd.SuperNET('{"requestType":"ramstatus", "coin":"BTCD"}', function(err, data){
		if(err)
			console.log("err: " + err);
		else
			res.render('ramstatus', {status: data});
	});
});

app.get('/getaddr/:addr', function(req, res){
	btcd.SuperNET('{"requestType":"ramrawind", "type": "addr", "string": "' + req.params.addr + '"}', function(err, data){
		if(err)
			console.log("err: " + err);
		else
			res.render('getaddr', {addr: JSON.stringify(data)});
	});
});

app.get('/getRamtx/:txid', function(req, res){
	btcd.SuperNET('{"requestType":"ramrawind", "destip":"127.0.0.1", "port": "14632", "coin":"BTCD", "type": "txid", "string": "' + req.params.txid + '"}', function(err, data){
		if(err)
			console.log("err: " + err);
		else
			res.render('getramtx', {tx: JSON.stringify(data)});
	});
});

var unspent = 0;
app.get('/ramtxlist/:addr/:unspent', function(req, res){
	if(req.params.unspent == "true")
		unspent = 1;
	else
		unspent = 0;
	btcd.SuperNET('{"requestType":"ramtxlist", "coin":"BTCD", "address": "' + req.params.addr + '", "unspent": "' + unspent + '"}', function(err, data){
		if(err)
			console.log("err: " + err);
		else
			res.render('ramtxlist', {txlist: JSON.stringify(data)});
	});
});

app.get('/getramblock/:blocknum', function(req, res){
	btcd.SuperNET('{"requestType":"ramblock", "coin":"BTCD", "blocknum": "' + req.params.blocknum + '"}', function(err, data){
		if(err)
			console.log("err: " + err);
		else
			res.render('ramblock', {block: JSON.stringify(data)});
	});
});

app.get('/ramrichlist/:numwhales', function(req, res){
if(req.params.numwhales <= 200){
	btcd.SuperNET('{"requestType":"ramrichlist", "coin":"BTCD", "numwhales": "'+ req.params.numwhales +'"}', function(err, data){
		if(err)
			console.log("err: " + err);
		else
			res.render('ramrichlist', {richlist: JSON.stringify(data)});
	});
}
else
    res.render('ramrichlist', {richlist: "Please specify a number less than 200 for the top addresses"});
});
