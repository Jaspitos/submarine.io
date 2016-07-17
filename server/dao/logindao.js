 /*Instande of needed modules*/
var crypto 		= require('crypto');
var MongoDB 	= require('mongodb').Db;
var Server 		= require('mongodb').Server;
var dbprop = require('../properties/db-properties').loadDbProperties();


console.log(dbprop);

/* establish the database connection */
var db = new MongoDB(dbprop.dbName, new Server(dbprop.dbHost, dbprop.dbPort, {auto_reconnect: true}), {w: 1});
	db.open(function(e, d){
	if (e) {
		console.log(e);
	}	else{
		console.log('connected to database :: ' + dbprop.dbName);
	}
});

//Colection we want to play with	
var accounts = db.collection('accounts');


//dao loggin checking cookies
exports.autoLogin = function(user, pass, callback){

	accounts.findOne({user:user},function(e,o){
		if (o){
			o.pass == pass ? callback(o) : callback(null);
		} else
		callback(null);
	})
}


//dao login when we use manual logins
exports.manualLogin = function(user, pass, callback)
{
	accounts.findOne({user:user}, function(e, o) {

		if (o == null){
			callback('user-not-found');
		}	else{
			validatePassword(pass, o.pass, function(err, res) {
				if (res){
					callback(null, o);
				}	else{
					callback('invalid-password');
				}
			});
		}
	});
}

/*
 *internal functions
 */

var validatePassword = function(insertedPass, dbPass, callback)
{

	callback(null, dbPass === insertedPass);
}

var md5 = function(str) {
	return crypto.createHash('md5').update(str).digest('hex');
}

var validatePasswordHashed = function(plainPass, hashedPass, callback)
{
	var salt = hashedPass.substr(0, 10);
	var validHash = salt + md5(plainPass + salt);
	//console.log(validHash);
	callback(null, hashedPass === validHash);
}