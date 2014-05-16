var mongoose = require('mongoose');

var mongoURI = process.env.mongoLab || 'mongodb://localhost/forshortly';

var db = mongoose.connection;

mongoose.connect(mongoURI);

db.on('error', console.error.bind(console, 'connection error:'));

module.exports = db;
