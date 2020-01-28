var express = require('express');
var router = express.Router();
const hbs = require("handlebars")
const template = hbs.compile("Options: {{options}}");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
