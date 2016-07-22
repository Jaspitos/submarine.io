/**
 *@Author: Lorenzo Gamboa Garcia
 *@Desc: Model for user
 */

 var mongoose = require('mongoose');
 var schema = mongoose.Schema;


 /*defining schema*/
 var userSchema = new schema({
 	name: String,
 	email: String,
 	username: { type: String, required: true, unique: true},
 	password: {type: String, required: true, unique: true},
 	admin: Boolean

 });


 /*create model*/
 var User = mongoose.model('User',userSchema);

 module.exports = User;