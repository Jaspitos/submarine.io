/**
 * @Author: Lorenzo Gamboa Garcia
 * @Desc: JS File to set Web App configurations
 */

 
 /*Instande of needed modules*/
 var http = require('http');
 var express = require('express');
 var session = require('express-session');
 var bodyParser = require('body-parser');
 var cookieParser = require('cookie-parser');
 var MongoStore = require('connect-mongo')(session);

 var app = express();

 /*Defining App settings*/
 app.set('port',process.env.PORT || 3000);
 app.set('views', __dirname + '/server/views');
 app.set('view engine', 'html');
 app.engine('html', require('ejs').renderFile);

 app.use(cookieParser());
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(express.static(__dirname + '/public'));//Defines public folder files as static (css,js,img..)

 //Mongo database Connection
 var dbHost = process.env.DB_HOST || 'localhost'
 var dbPort = process.env.DB_PORT || 27017;
 var dbName = process.env.DB_NAME || 'test';

 //TODO
 var dbURL = 'mongodb://'+dbHost+':'+dbPort+'/'+dbName;
 if (app.get('env') == 'live'){
 // prepend url with authentication credentials // 
	dbURL = 'mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+dbHost+':'+dbPort+'/'+dbName;
 }
 
 //TODO: Opens session
 
 app.use(session({
	secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4',
	proxy: true,
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({ url: dbURL })
	})
);


 //Module of routes conf
 require('./server/routes/routes')(app);

 //Start server
 http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
