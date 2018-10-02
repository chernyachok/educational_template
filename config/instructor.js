var mongoose = require('./db');
//instructor model

var instructorSchema = new mongoose.Schema({
  first_name: {
    type:String
  },
  last_name: {
    type:String
  },
  username:{
    type: String
  },
  email:{
    type: String
  },
  password:{
    type: String
  },

  address:[{
    street: String,
    city: String,
    zip: String,
  }],
  classes:[{
    class_id: {type: mongoose.Schema.Types.ObjectId},
    class_title: {type:String}
  }]

})

var Instructor = mongoose.model('instructor', instructorSchema);

module.exports = Instructor;
