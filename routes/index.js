var express = require('express');
var router = express.Router();

var returnJSON = require('../models/search_model').results;

router.get('/search', returnJSON);

module.exports = router;
