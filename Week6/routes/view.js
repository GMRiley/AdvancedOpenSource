var express = require('express');
var router = express.Router();
let User = require('../db/models/User');
require('../db/mongoose/mongoose')

/* GET home page. */
router.get('/', function(req, res, next) {
  let users = User.find({}, (err, users) => {
    var userMap = {};

    users.forEach( (user) => {
      userMap[user._id] = user;
    })
    console.log(userMap)
    res.render('view.hbs',{
      employees: userMap
    })
  })
});

module.exports = router;
