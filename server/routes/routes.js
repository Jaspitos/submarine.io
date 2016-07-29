var logindao = require('../dao/logindao');
var User = require('../models/user');
var mailer = require('../models/mailer');



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

					// Route to signup.html
					app.get('/signup', function(req, res) {
						// create a new user

						res.render('signup', { title: 'Sing up now' });
					});

					// TODO: Not done yet 
					app.post('/signup', function(req, res) {

						// create a new user
						logindao.signUp(req.body['name'], req.body['e-mail'], req.body['username'], req.body['pass'], function(e, o){

							if (!o){
								res.status(400).send(e);
							}	else{
								mailer.sendEmail(req.body['e-mail']);
								res.status(200).send(o);
							}
						});

					});

					/* Http get request home page */
					app.get('/index', function(req, res) {
						if (req.session.user == null){
					// if user is not logged-in redirect back to login page //
					res.redirect('/');
				}	else{
					res.render('index', { title : 'This index site', udata : req.session.user});
				}
			});

					/* Http get request to profile.html */
					app.get('/profile', function(req,res){
						logindao.getProfileInfo(req.session.user.username , function(e, o){
						if(e){
							res.render('profile', {profile: e});
						}
					
						})
						
					});

					/* Http get request to play.html */
					app.get('/play', function(req,res){
						res.render('play');
					});

					/*User decides to play a gb game*/
					app.post('/playnow', function(req,res){
						console.log("Juego elegido ==> "+req.body['gamechoosen']);
						if(req.body['gamechoosen'] == 'blue'){
							res.render('cartridge_blue');
						}
						else if(req.body['gamechoosen'] == 'red'){
							res.render('cartridge_red');
						}else if(req.body['gamechoosen'] == 'green'){
							res.render('cartridge_green');
						}else if(req.body['gamechoosen'] == 'yellow'){
							res.render('cartridge_yellow');
						}else{
							res.render('404');
						}
						
					});

					/* Playground for flickr api */
					app.get('/upload', function(req,res){
						var title ="Uploading Site";
						var Flickr = require("flickrapi"),
						flickrOptions = {
							api_key: "59174c4006637f35ed2a71c90d6382f1",
							secret: "958843ab0b664cd2"
						};

						Flickr.tokenOnly(flickrOptions, function(error, flickr) {
							flickr.photos.search({
								user_id: '145579429@N03',
								page: 1,
								per_page: 3
							}, function(err, result) {
				 		 // result is Flickr's response
				 		 var result = result.photos;
				 		 console.log(result);
				 		 res.render('upload',{result,title});
						});
							
						});
						
					});



					//Http get request to logout.html
					app.post('/logout', function(req, res){
						res.clearCookie('user');
						res.clearCookie('pass');
						req.session.destroy(function(e){ res.status(200).send('ok'); });
					})


					// Htpp request site not routed
					app.get('*', function(req, res) { 
						res.render('404', { title: 'Page Not Found'}); 
					});


					


				};