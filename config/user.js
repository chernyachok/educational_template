var mongoose = require('./db');
const bcrypt= require('bcryptjs')
const Instructor = require('./instructor')
const Student =require('./student')
//users model

var userSchema = new mongoose.Schema({
  username: {
    type:String
  },
  email: {
    type:String
  },
  password : {
    type:String
  },
  type:{
    type: String
  }
})

var User = mongoose.model('users', userSchema);

module.exports = User;


module.exports.getUserById = (id, callback)=>{//id
  User.findOne({_id: id}).then((user)=>{

    return callback(null, user)//one user
  }).catch((err)=>{
    return callback("no such user found");
  })
}

module.exports.getUserByUsername = (username, callback)=>{//username
  User.findOne({username: username}).then((user)=>{
    return callback(null, user)
  }).catch((err)=>{
    return callback("no such user found")
  })
}

module.exports.saveStudent = (newUser, newStudent, itsStudent,callback )=>{
  //console.log('hashing')
  /*var salt = bcrypt.genSaltSync(15)
    var hash = bcrypt.hashSync(newStudent.password, salt)
    console.log(hash)
    return hash;*/
  var salt = bcrypt.genSalt(15).then((salt)=>{
    bcrypt.hash(newStudent.password, salt).then((hash)=>{
      newUser.password = hash;
      var savedUser = new User(newUser);
      savedUser.save().then(()=>{
        console.log('user saved')
        newStudent.password = hash;
          if(itsStudent){
            var savedStudent = new Student(newStudent);
            savedStudent.save().then(()=>{
              console.log('student saved')
              return  callback(null);
            })
          }else{
            var savedInstructor = new Instructor(newStudent);
            savedInstructor.save().then(()=>{
            console.log('instructor saved')
            return  callback(null);
            })
          }
      })
    })
  })
}

module.exports.comparePassword = (candidatePassword , hash, callback)=>{
    bcrypt.compare(candidatePassword, hash).then((isMatch)=>{
      callback(null,isMatch)
    })
}
