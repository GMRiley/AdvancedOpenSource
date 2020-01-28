var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
  console.log(req.body);
    res.render('results.hbs', {title: 'Express', ...req.body });
});

module.exports = router;
