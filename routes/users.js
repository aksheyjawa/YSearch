var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');

  
  // And insert something like this instead: 
  res.json([{ 
      id: 1, 
      username: "samsepi0l" 
    }, 
    { 
      id: 2, 
      username: "D0loresH4ze" 
    },
    { 
      id: 3, 
      username: "aqweqwedsda" 
    }
  ]);
  

    //console.log(req.query);
    console.log("Route: /search/api");
    //var returnJSON = require('../models/search_model').results;
    //returnJSON(req, res);

});

module.exports = router;
