var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

var urlSchema = new mongoose.Schema({
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: Number,
  time : { type : Date, default: Date.now },
});

urlSchema.pre('save', function(next){
  var code = createSha(this.url);
  this.code = code;
  next();
});

var Link = db.model('Link', urlSchema);

//FYI, SHA: Secure Hash Algorithm
var createSha = function(url) {
  var shasum = crypto.createHash('sha1');
  shasum.update(url);
  return shasum.digest('hex'.slice(0,5));
};

module.exports = Link;



