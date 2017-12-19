var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var returnJSON = require('../models/search_model').results;

router.get('/search', returnJSON);

module.exports = router;
