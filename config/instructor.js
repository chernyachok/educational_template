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


module.exports.getInstructorByUsername = (username, callback)=>{//username
  Instructor.findOne({username: username}).then((instructor)=>{
    return callback(null, instructor)
  }).catch((err)=>{
    return callback("no such user found")
  })
}

module.exports.registerClass = (info, callback)=>{
  Instructor.findOne({username: info.instructor_username}).then((row)=>{
    var existingClass = row.classes;//accces to all classes of st
    for(var i=existingClass.length-1; i>=0; i--){
      if(info.class_id == existingClass[i].class_id){
        return callback("Such course alredy registered")
      }
    }
    Instructor.findOneAndUpdate({username: info.instructor_username}, {$push:{classes:{class_id: info.class_id, class_title:info.class_title}}},{new: true}).then((updatedInstructor)=>{
      return callback(null, updatedInstructor)
    })
  }).catch((err)=>{
    console.log('NO SUCH USERNAME')
  })
}
