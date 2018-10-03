var mongoose = require('mongoose');
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost:27017/elearn');
// set view engine
mongoose.connection.on('open', function(){
  console.log('connected to the data');

}).on('error', function(err){
  console.log(err);
});
module.exports = mongoose;
