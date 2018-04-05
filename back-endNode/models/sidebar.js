var mongoose = require('mongoose');

//page schema
var  SidebarSchema = mongoose.Schema({

  content: {
    type: String
  }
}, {collection: 'sidebar'});

var Sidebar = module.exports = mongoose.model("Sidebar", SidebarSchema);
