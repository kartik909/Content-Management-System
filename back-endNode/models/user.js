var mongoose = require('mongoose');

//page schema
var  UserSchema = mongoose.Schema({

  username: {
    type: String
  },
  password: {
    type: String
  }
});

var User = module.exports = mongoose.model("User", UserSchema);
