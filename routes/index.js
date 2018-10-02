const router = require('express').Router();
const classes = require('../config/class');


router.route('/').get((req,res)=>{
  classes.getClasses(function(err, data){
    if(err) return res.send(err);
    res.render('index', {data: data})
  },2)
})
module.exports = router;
