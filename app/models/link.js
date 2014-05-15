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

var Link = db.model('Link', urlSchema);

urlSchema.on('init', function(link) {
  var shasum = crypto.createHash('sha1');
  shasum.update(link.get('url'));
  link.set('code', shasum.diegest('hex'.slice(0,5)));
});

module.exports = Link;


//Bookshelf DB setup - all currently handled in mongo/mongoose db setup:
// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function(){
//     this.on('creating', function(model, attrs, options){
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

