

 	var dbHost = 'lorenzito93:soygamboa93@ds027215.mlab.com' || 'localhost';
	var dbPort = 27215 || 27017;
 	var dbName = 'accounts';

	var mongoconf = {
 		'dbHost' : dbHost,
 		'dbPort' : dbPort,
 		'dbName' : dbName

 	}

   exports.loadDbProperties = function(){
 	return mongoconf;
  }