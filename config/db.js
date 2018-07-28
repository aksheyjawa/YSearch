/*
var app = require("../app.js");

console.log("app.get('env'): " + app.get('env'));
var mongoURL = "", db_name = "";
if ( app.get('env') === 'development' ) {
  mongoURL = 'mongodb://localhost:27017/indexes';
  db_name = 'indexes';
}
else if ( app.get('env') === 'production' ) {
  mongoURL = 'mongodb://aksheyjawa:qwerty123#@ds141185.mlab.com:41185/yl-mongo';
  db_name = 'yl-mongo';
}
*/

let mongoURL = "", db_name = "";
mongoURL = 'mongodb://localhost:27017/indexes';
db_name = 'indexes';

//mongoURL = 'mongodb://aksheyjawa:qwerty123#@ds141185.mlab.com:41185/yl-mongo';
//db_name = 'yl-mongo';

module.exports = {mongoURL, db_name};