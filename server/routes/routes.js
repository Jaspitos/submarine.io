
var logindao = require('../dao/logindao');


module.exports = function (app){
	

	// Loads login.html
	app.get('/',function(req,res){


		//If session is live then redirect to index
		if(req.session.user != null){
		res.redirect('/index');
		}

		//Checks if the credentials are saved in clients cookies
		else if(req.cookies.user == undefined || req.cookies.pass == undefined){
			res.render('login', { title: 'Log In'});
			console.log("Cookies Not available");
		}
		else{
		// attempt automatic login //
			logindao.autoLogin(req.cookies.user, req.cookies.pass, function(o){
				if (o != null){
				    req.session.user = o;
					res.redirect('/index');
				}	else{
					res.render('login', { title: 'Hello - Please Login To Your Account' });
				}
			});
		}

		
	});

	// Submits login credentials
	app.post('/', function(req, res){
		logindao.manualLogin(req.body['user'], req.body['pass'], function(e, o){

			if (!o){
				res.status(400).send(e);
			}	else{
				req.session.user = o;
				if (req.body['remember-me'] == 'true'){
					res.cookie('user', o.user, { maxAge: 900000 });
					res.cookie('pass', o.pass, { maxAge: 900000 });
				}
				res.status(200).send(o);
			}
		});
	});

	// TODO: Not done yet 
	app.get('/signup', function(req, res) {
		res.render('signup', { title: 'Sing up now' });
	});



	//Http get request home page
	app.get('/index', function(req, res) {
		if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
			res.redirect('/');
		}	else{
			res.render('index', { title : 'This index site', udata : req.session.user});
		}
	});

	// Htpp request site not routed
	app.get('*', function(req, res) { 
		res.render('404', { title: 'Page Not Found'}); 
	});

	


};