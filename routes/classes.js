const router = require('express').Router();
const Class = require('../config/class');
const user = require('../config/user.js')

var log_in = (req,res,next)=>{
  if(!req.isAuthenticated()){
    return res.redirect('/')
  }
  next()
}

router.route('/').get((req,res)=>{
  Class.getClasses(function(err, data){
    if(err) return res.send(err);
    res.render('classes/index', {data: data})
  },3)
})

router.route('/:id/details').get((req,res)=>{
  Class.getClassById(req.params.id,function(err, classes){
    if(err) return res.send(err);
    res.render('classes/details', {class: classes})
  })
})
router.route('/:id/lessons')
.get(log_in,(req,res)=>{
  Class.getClassById(req.params.id,function(err, classes){
    if(err) return res.send(err);
    res.render('classes/lessons', {class: classes})
  })
})

router.route('/:id/lessons/:lesson_id')
.get(log_in,(req,res)=>{
  Class.getClassById(req.params.id,function(err, classes){
    if(err) return res.send(err);
    var currentLesson =false
    //[] OK {} not OK false OK null OK and var currentLesson OK; object with no value [];
    for(let i =0; i<classes.lessons.length; i++){
      if(classes.lessons[i].lesson_number == req.params.lesson_id){
        currentLesson = classes.lessons[i];
        break;
      }
    }
    res.render('classes/lesson', {"class": classes, "lesson": currentLesson})
  })
})


module.exports = router;
