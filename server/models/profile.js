/**
 *@Author: Lorenzo Gamboa Garcia
 *@Desc: Model for profile user
 */

 var mongoose = require('mongoose');
 var schema = mongoose.Schema;

  /*defining schema*/
  var profileUserSchema = new schema({
  	username: {type: String, unique: true, required: true},
  	totalgames : {type: Number},
  	won : {type: Number},
  	lost : {type: Number}
  });

 /*We define model*/
  var Profile = mongoose.mode('profile',profileUserSchema);

  module.exports = Profile;
