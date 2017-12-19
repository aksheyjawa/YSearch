var express = require('express');
var router = express.Router();
//var path = require('path');

var returnJSON = require('../models/search_model').results;

router.get('/search', returnJSON);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.


module.exports = router;
