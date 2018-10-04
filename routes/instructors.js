const router = require('express').Router();
const Class = require('../config/class');
const User = require('../config/user.js')
const Instructor = require('../config/instructor.js')

var log_in = (req,res,next)=>{
  if(!req.isAuthenticated()){
    return res.redirect('/')
  }
  next()
}

router.route('/classes').get( log_in,(req,res)=>{
    Instructor.getInstructorByUsername(req.user.username, (err,instructor)=>{
      if(err) throw err;
      res.render('instructors/classes', {instructor: instructor})
    })
})
//to register instructor also for teaching
router.route('/classes/register').post((req,res)=>{
    let info ={};
    info['instructor_username']= req.user.username;
    info['class_id'] = req.body.class_id;
    info['class_title'] = req.body.class_title;
    //console.log(info)
    Instructor.registerClass(info, (err,updatedInstructor)=>{
      if(err){
        req.flash('error', err)
        res.redirect('/classes')
      }
      else{
        //console.log("user updated with classees")
        req.flash('success', "Class registered successfully")
        res.redirect('/instructors/classes');
      }
    })
})

router.route('/classes/:id/lessons/new')
.get( log_in,(req,res)=>{

      res.render('instructors/newlesson', {class_id: req.params.id})
})
.post((req,res)=>{
  let info ={};
  info['class_id'] = req.params.id;
  info['lesson_number'] = req.body.lesson_number;
  info['lesson_title']= req.body.lesson_title;
  info['lesson_body']= req.body.lesson_body;

  Class.pushLessons(info, (err,getLessons)=>{
    if(err) throw err;
    req.flash('success', "Lesson added");
    res.redirect('/instructors/classes');
  })

})


module.exports = router
