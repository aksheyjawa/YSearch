var express = require('express');
var router = express.Router();

var returnJSON = require('../models/search_model').results;

router.get('/search', returnJSON);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

module.exports = router;
