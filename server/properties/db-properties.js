

 	var dbHost = process.env.DB_HOST  || 'localhost';
	var dbPort = process.env.DB_PORT  || 27017;
 	var dbName = process.env.DB_NAME  || 'accounts';

 	var mongoconf = {
    development: {
        app: {
            dbHost: 'localhost'
        },
        dbPort: 27017,
        dbName: 'accounts'
    },
    production: {
        app: {
            dbHost: 'lorenzito93:soygamboa93@ds027215.mlab.com'
        },
        dbPort: 'port',
        dbName: 'db'
   }
};


   exports.loadDbProperties = function(enviroment){
 	return  mongoconf[enviroment];
  }






