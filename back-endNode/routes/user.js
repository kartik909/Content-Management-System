var express =  require('express');
var router = express.Router();

//get the database model
var User = require('../models/user');

//Register User
router.post('/register', function(req, res) {

var username = req.body.username;
var password = req.body.password;

  User.findOne({username: username},function(err, user) {
    if (err) {
      console.log(err);
    }
    if (user) {
    res.json("userExists");
    }
     else {
       var user = new User({
         username: username,
         password: password
       });
       user.save(function(err) {
         if (err) {
           console.log(err);
         }
         else {
           res.json("UserRegisterd");
         }
       });
     }
  });
});

//Login user
router.post('/login', function(req, res) {

  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username, password: password },function(err, user) {
    if (err) {
      console.log(err);
    }
    if (user) {
      res.json(username);
    }else {
    res.json("invalidLogin");  
    }
    });
});

//exports
module.exports = router;
