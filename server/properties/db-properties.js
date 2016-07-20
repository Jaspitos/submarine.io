

 	var dbHost = process.env.DB_HOST || 'localhost';
	var dbPort = process.env.DB_PORT || 27017;
 	var dbName = process.env.DB_NAME || 'accounts';

	var mongoconf = {
 		'dbHost' : dbHost,
 		'dbPort' : dbPort,
 		'dbName' : dbName

 	}

   exports.loadDbProperties = function(){
 	return mongoconf;
  }