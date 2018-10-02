var mongoose = require('./db');
//student model

var studentSchema = new mongoose.Schema({
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
    street_address: String,
    city: String,
    zip: String,
  }],
  classes:[{
    class_id: {type: mongoose.Schema.Types.ObjectId},
    class_title: {type:String}
  }]

})

var Student = mongoose.model('students', studentSchema);

module.exports = Student;
