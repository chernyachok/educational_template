const router = require('express').Router();
const classes = require('../config/class');
const user = require('../config/user.js')

router.route('/').get((req,res)=>{
  classes.getClasses(function(err, data){
    if(err) return res.send(err);
    res.render('classes/index', {data: data})
  },3)
})

router.route('/:id/details').get((req,res)=>{
  classes.getClassById(req.params.id,function(err, classes){
    if(err) return res.send(err);
    res.render('classes/details', {class: classes})
  })
})

module.exports = router;
