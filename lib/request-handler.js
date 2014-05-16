var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');

var db = require('../app/config');
var User = require('../app/models/user');
var Link = require('../app/models/link');
// var Users = require('../app/collections/users');
// var Links = require('../app/collections/links');

exports.renderIndex = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function(){
    res.redirect('/login');
  });
};

exports.fetchLinks = function(req, res) {

  Link.find(function(error, links){
    console.log('logging links, ', links);
    if (links){
      res.send(200, links);
    }
  });
};

exports.saveLink = function(req, res) {
  var uri = req.body.url;

  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.send(404);
  }

  Link.findOne( { url: uri }, function(error, link) {
    if( link ) {
      res.send(200, link.attributes);
    } else {
      util.getUrlTitle( uri, function(eror, title) {
        if ( error ) {
          console.log('Error reading URL heading: ', error);
          return res.send(404);
        }

        var link = new Link({
          url: uri,
          title: title,
          base_url: req.headers.origin
        });

        link.save( function( error, link ) {
          if (error) {
            console.log('There was an error saving link to the database');
          } else {
            res.send(200, link);
          }
        });
      });
    }
  });
};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username }, function(error, user){
    if (error) {
      res.redirect('/login');
    } else {
      console.log('user', user);
      user.comparePassword(password, function(match) {
        if ( match ) {
          util.createSession(req, res, user);
        } else {
          res.redirect('/login');
        }
      });
    }
  });
};

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username }, function(error, user) {
    if (!user) {
      var newUser = new User ({
        username: username,
        password: password
      });
      newUser.save( function(error, user) {
        if (error) {
          console.log('Account already exists');
          res.redirect('/signup');
        } else {
          util.createSession(req, res, newUser);
        }
      });
    }
  });
};

exports.navToLink = function(req, res) {

  Link.findOne({ code: req.params[0] }, function(error, link) {
    if (link) {
      link.visits = link.visits + 1;
      link.save( function ( error, link){
        if (error) {
          console.log('error updating link visits');
        } else {
          res.redirect(link.url);
        }
      });
    } else {
      res.redirect('/');
    }
  });
};
