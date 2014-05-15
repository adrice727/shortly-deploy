var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var crypto = require('crypto');
var mongoURI = process.env.mongoLab || 'mongodb://localhost/forshortly';


var db = mongoose.connection;

mongoose.connect(mongoURI);

db.on('error', console.error.bind(console, 'connection error:'));




//Initial setup for mongo.  Needed to be moved to respective model files.
// db.once('open', function() {
// var urlSchema = new mongoose.Schema({
//   url: String,
//   base_url: String,
//   code: String,
//   title: String,
//   visits: Number,
//   time : { type : Date, default: Date.now }
// });

// urlSchema.on('init', function(link) {
//   var shasum = crypto.createHash('sha1');
//   shasum.update(link.get('url'));
//   link.set('code', shasum.diegest('hex'.slice(0,5)));
// });

// var userSchema = new mongoose.Schema({
//   username: String,
//   password: String
// });


// userSchema.methods.comparePassword =  function(attemptedPassword, callback) {
//   bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//     callback(isMatch);
//   });
// };

// userSchema.methods.hashPassword = function() {
//   var cipher = Promise.promisify(bcrypt.hash);
//   return cipher(this.get('password'), null, null).bind(this)
//     .then(function(hash) {
//       this.set('password', hash);
//     });
// };

// userSchema.on('init', function(user) {
//   user.hashPassword();
// });

// });




//Old db setup for sqlite and bookshelf/knex:
// var Bookshelf = require('bookshelf');
// var path = require('path');

// var db = Bookshelf.initialize({
//   client: 'sqlite3',
//   connection: {
//     host: '127.0.0.1',
//     user: 'your_database_user',
//     password: 'password',
//     database: 'shortlydb',
//     charset: 'utf8',
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   }
// });

// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('base_url', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

module.exports = db;
