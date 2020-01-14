var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('form', { title: 'Express' });
});

module.exports = router;

const submit = () => {
    const name = document.querySelector(".name")
    const email = document.querySelector(".email")
    const comments = document.querySelector(".comments")
    
}