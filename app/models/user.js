var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
  username: {type: String, required: true, index : {unique: true}},
  password: {type: String, rrequired: true }
});


// Hashes the user password before saving to the database
userSchema.pre('save', function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.get('password'), null, null).bind(this)
  .then(function(hash) {
    this.set('password', hash);
    next();
  });
});

userSchema.methods.comparePassword =  function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
    callback(isMatch);
  });
};

var User = mongoose.model('User', userSchema);

module.exports = User;
