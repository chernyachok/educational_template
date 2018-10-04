var mongoose = require('./db');


var schema = new mongoose.Schema({
  title: {type:String},
  description: {type:String},
  instructor : {type:String},
  lessons: [{
    lesson_number: {type: Number},
    lesson_title: {type: String},
    lesson_body: {type: String}
  }]
})

var Class = mongoose.model('classes', schema);

module.exports = Class;


module.exports.getClasses = (callback,limit)=>{
  Class.find({}).limit(limit).then((data)=>{

    return callback(null, data)
  }).catch((err)=>{
    return callback("No classes found");
  })
}


module.exports.getClassById = (id , callback)=>{
  Class.findOne({_id: id}).then((classname)=>{
    //console.log(classname)
    return callback(null, classname);
  }).catch((err)=>{
    return callback("No classes found");
  })
}


module.exports.pushLessons =(info, callback)=>{
  Class.findOneAndUpdate({_id: info.class_id}, {$push: {lessons: {lesson_number: info.lesson_number, lesson_title: info.lesson_title, lesson_body:info.lesson_body}}})
  .then(()=>{
    return callback(null, 'updated')
  })
  .catch((err)=>{
    callback('Cant modify, no such row')
  })
}
