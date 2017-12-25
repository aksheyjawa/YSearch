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

var escapeString = function(str) {
   return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
};


function getData(database, req, res) {

  const indexesDB = database.db(db_name);

  let regex = new RegExp(escapeString(req.query.q), "i");
/*
  indexesDB.collection("all")
    .find({
      $or: [
              { "tag": {$regex: `${req.query.q}`, $options: 'i'} },
              { "title": {$regex: `${req.query.q}`, $options: 'i'} }
            ]
    })
    .toArray( function (err, result) {
      if (err) throw err;
      res.json(result);
      indexesDB.close();
    });
*/

  indexesDB.collection("all")
    //.find({"tag": {$regex: `${req.query.q}`, $options: 'i'}}) 
    .aggregate([
        {
          $match: { $or: [ { "title": regex }, { "contents.title": regex },{ "index.tag": regex } ] }
        },
        { $group : { 
                      _id : "$doc", 
                      matches: { 
                              $push: {
                                      title: "$title",
                                      lessonNum: "$num",
                                      pageNum: "1",
                                      contents: "$contents",
                                      index: { tag: "$index.finishedTag", page: "$index.pageNum"}
                                    }
                            } 
                    } 
        }
        /*{ $project: {
                  "$_id": "$all"
                }
        }*/
    ])
    .toArray( function (err, result) {
      if (err) throw err;
      res.json(result);
      indexesDB.close();
    });

}



/*
  indexesDB.collection("all")
    //.find({"tag": {$regex: `${req.query.q}`, $options: 'i'}}) 
    .aggregate([
        {
          $match: { $or: [ { "finishedTag": regex }, { "title": regex } ] }
        },
        {
          $unwind: {
            path: "$lessonNum",
            preserveNullAndEmptyArrays: true
          }
        },        
        {
          $lookup: {
            from: "lessons_yss_toc",
            localField: "lessonNum",
            foreignField: "num",
            as: "lesson"
          }
        },
        { $group : { 
                      _id : "$doc", 
                      matches: { 
                              $push: {
                                      title: "$title",
                                      tag: "$finishedTag",
                                      lessonNum: "$lessonNum",
                                      pageNum: "$pageNum",
                                      contents: "$contents",
                                      lesson: "$lesson"
                                    }
                            } 
                    } 
        }

    ])
    .toArray( function (err, result) {
      if (err) throw err;
      res.json(result);
      indexesDB.close();
    });

}


*/