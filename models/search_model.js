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

/*
Project: It is used to decide what elements to send to the next stage
Filter: Selects a subset of an array to return based on the specified condition. Returns an array with only those elements that match the condition.

Questions:
Where can each of the operators can be used. Ex: $in, $elemmatch, etc.
How does unwind work?
How to create index?
*/
  indexesDB.collection("all")
    //.find({"tag": {$regex: `${req.query.q}`, $options: 'i'}}) 
    .aggregate([
        {
          $match: { 
              $or: [ 
                      { "title": regex }, //jsr and yss_lessons
                      { "contents.title": regex }, //jsr
                      { "index.finishedTag": regex } //yss_lessons
                      //{ "tags": regex } //yss_lessons
                      //{tags: { $elemMatch: { $elemMatch: [ regex ] } } }
                    ] 
            }
        },
        { 
          $group : { 
                      _id : "$doc", 
                      "matches": { 
                              $push: {
                                      title: "$title",
                                      lessonNum: "$num",
                                      pageNum: "$pageNum",
                                      contents: "$contents",
                                      //index: { tag: "$index.finishedTag", pageNum: "$index.pageNum"},
                                      tags: "$tags",
                                    }
                            } 
                    } 
        },
        { $project: 
          { 
            _id: 1,   //show _id
            matches: { 
              $slice: [ "$matches", 5 ]  //limit matches array
            } 
          } 
        }
        //{ "$limit": 1 }
    ])
    .toArray( function (err, result) {
      if (err) throw err;
      res.json(result);
      indexesDB.close();
    });

}

//TODO Return only that data that is needed

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