var express =  require('express');
var router = express.Router();

//get the database model
var Sidebar = require('../models/sidebar');

//get sidebar
router.get('/edit-sidebar', function(req, res) {

var id = "5ac691d8e36debf2accc2372";

  Sidebar.findById(id, function(err, sidebar) {
    if (err) {
      console.log(err);
    res.json("problem");
    }
    res.json(sidebar);
  });
    });

//post sidebar
router.post('/edit-sidebar', function(req, res) {

var content = req.body.content;
var id = "5ac691d8e36debf2accc2372";

  Sidebar.findById(id,function(err, sidebar) {
    if (err) {
      console.log(err);
      console.log("problem");
    }
       sidebar.content = content;

       sidebar.save(function(err) {
         if (err) {
           console.log(err);
           console.log("problem");
         }
         else {
           res.json("ok");
         }
       });
  });
});

//exports
module.exports = router;
