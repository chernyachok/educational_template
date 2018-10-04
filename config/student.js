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

module.exports.getStudentByUsername = (username, callback)=>{//username
  Student.findOne({username: username}).then((student)=>{
    return callback(null, student)
  }).catch((err)=>{
    return callback("no such user found")
  })
}

module.exports.registerClass = (info, callback)=>{
  Student.findOne({username: info.student_username}).then((row)=>{
    var existingClass = row.classes;//accces to all classes of st
    for(var i=existingClass.length-1; i>=0; i--){
      if(info.class_id == existingClass[i].class_id){
        return callback("Such course alredy registered")
      }
    }
    Student.findOneAndUpdate({username: info.student_username}, {$push:{classes:{class_id: info.class_id, class_title:info.class_title}}},{new: true}).then((updatedStudent)=>{
      return callback(null, updatedStudent)
    })
  }).catch((err)=>{
    console.log('NO SUCH USERNAME')
  })
}
