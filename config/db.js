var app = require("../app.js");

/****** Database ******/
//console.log("app.get('env'): " + app.get('env'));
var mongoURL = "" ;
//if ( app.get('env') === 'development' ) {
  mongoURL = 'mongodb://localhost:27017/indexes';
//}
//else if ( app.get('env') === 'production' ) {
//  mongoURL = 'mongodb://aksheyjawa:qwerty123#@ds141185.mlab.com:41185/yl-mongo';
//}
var db_name = 'indexes';
var collection_name = 'lessons_yss';

module.exports = {mongoURL, db_name, collection_name};