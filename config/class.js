var mongoose = require('./db');


var schema = new mongoose.Schema({
  title: {type:String},
  description: {type:String},
  instructor : {type:String},
  lessons: [{
    lessons_number: {type: Number},
    lessons_title: {type: String},
    lessons_body: {type: String}
  }]
})

var model = mongoose.model('classes', schema);

module.exports = model;


module.exports.getClasses = (callback,limit)=>{
  model.find({}).limit(limit).then((data)=>{

    return callback(null, data)
  }).catch((err)=>{
    return callback(" its find suka made mistake");
  })
}


module.exports.getClassById = (id , callback)=>{
  model.findOne({_id: id}).then((classname)=>{
    console.log(classname)
    return callback(null, classname);
  }).catch((err)=>{
    return callback("no such id");
  })
}
