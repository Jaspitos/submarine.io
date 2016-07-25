	var nodemailer = require('nodemailer');

	/**
	 *@Author: Lorenzo Gamboa Garcia
	 *@Desc: Model to send a welcome e-mail to suscribers
	 */

	var transporter = nodemailer.createTransport('smtps://pokechu.io.platform@gmail.com:pikachuisnumber23@smtp.gmail.com');

	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: '<pokechu.io.platform@gmail.com>', // sender address
	    to: null, // list of receivers
	    subject: 'SIGN UP PEKACHU', // Subject line
	    text: 'Welcome to pekachu community...', // plaintext body
	    html: '<b>Hello world</b>' // html body
	};

	// send mail with defined transport object
	exports.sendEmail = function(receiver){
		mailOptions['to'] = receiver;
		transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);
	});

	}