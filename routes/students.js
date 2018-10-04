const router = require('express').Router();
const Class = require('../config/class');
const User = require('../config/user.js')
const Student = require('../config/student.js')

var log_in = (req,res,next)=>{
  if(!req.isAuthenticated()){
    return res.redirect('/')
  }
  next()
}

router.route('/classes').get( log_in,(req,res)=>{
    Student.getStudentByUsername(req.user.username, (err,student)=>{
      if(err) throw err;
      res.render('students/classes', {student: student})
    })
})

router.route('/classes/register').post((req,res)=>{
    let info ={};
    info['student_username']= req.user.username;
    info['class_id'] = req.body.class_id;
    info['class_title'] = req.body.class_title;
    //console.log(info)
    Student.registerClass(info, (err,updatedStudent)=>{
      if(err){
        req.flash('error', err)
        res.redirect('/classes')
      }
      else{
        //console.log("user updated with classees")
        req.flash('success', "Class registered successfully")
        res.redirect('/students/classes');
      }
    })
})

module.exports = router
