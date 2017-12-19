var MongoClient = require('mongodb').MongoClient;
const {mongoURL, db_name, collection_name} = require('../config/db.js');

exports.results = function(req, res, next) {

  MongoClient.connect(mongoURL, function (err, database) {

    if (err) throw err;

    if(req.query.hasOwnProperty('q')) {
      getData(database, req, res);
    }

  });
}

function getData1(database, req, res) {

  const indexesDB = database.db(db_name);

  indexesDB.collection(collection_name)
    .find({"tag": {$regex: `${req.query.q}`, $options: 'i'}})
    .toArray( function (err, result) {
      if (err) throw err;
      res.json(result);
      indexesDB.close();
    });

}

var escapeString = function(str) {
   return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
};

function getData(database, req, res) {

  const indexesDB = database.db(db_name);

  let regex = new RegExp(escapeString(req.query.q), "i");

  indexesDB.collection("lessons_yss")
    //.find({"tag": {$regex: `${req.query.q}`, $options: 'i'}}) 
    .aggregate([
        {
          $match: { tag: regex }
        },
        {
          $unwind: "$lessonNum"
        },        
        {
          $lookup: {
            from: "lessons_yss_toc",
            localField: "lessonNum",
            foreignField: "num",
            as: "lesson"
          }
        }
    ])
    .toArray( function (err, result) {
      if (err) throw err;
      res.json(result);
      indexesDB.close();
    });

}