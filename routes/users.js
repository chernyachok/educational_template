const router = require('express').Router();
const passport = require("passport");
const localStrategy = require('passport-local').Strategy;
const User = require('../config/user.js')
const Instructor = require('../config/instructor')
const Student =require('../config/student')
const bcrypt = require('bcryptjs');
//const flash = require('express-flash')



router.route('/signup')
  .get((req,res)=>{
    res.render('users/signup');
  })
  .post((req,res)=>{
    //console.log(req.body)
    var first_name = req.body.first_name
    var last_name = req.body.last_name;
    var street_address = req.body.street_address;
    var city = req.body.city;
    var zip = req.body.zip;
    var email  =req.body.email
    var username = req.body.username;
    var password = req.body.password;
    var password_2 = req.body.password_2;
    var type = req.body.type;


    req.checkBody('first_name', 'first name is required').notEmpty()
    req.checkBody('last_name', 'last name is required ').notEmpty()
    req.checkBody('email', 'email is required').notEmpty()
    req.checkBody('email', 'email not valid format').isEmail()
    req.checkBody('username', 'username is required').notEmpty()
    req.checkBody('password', 'password is required').notEmpty()
    req.checkBody('password_2', 'password2 is required').notEmpty()
    req.checkBody('password_2', 'passwords do not match').equals(req.body.password);

    var errors = req.validationErrors()
    if(errors){
      res.render('users/signup',{
        errors:errors,
        first_name: first_name,
        last_name: last_name,
        username: username,
        password: password,
        password_2: password_2,
        email: email,
        street_address: street_address,
        city: city,
        zip: zip
      })
    }else{
      var newUser = {
        username: username,
        email: email,
        password: password,
        type: type
      }
      var newStudent = {
        first_name: first_name,
        last_name: last_name,
        username: username,
        password: password,
        email: email,
        address: [{
          street_address: street_address,
          city: city,
          zip: zip
        }]
      }
      if(type =='student'){
        User.saveStudent(newUser,newStudent,true ,function(err,student){
            if(err) throw err
          console.log('Student model created')
          req.flash('registered','Registered successfully!' )
          res.redirect('/users/signup')
        })
      }else{
        User.saveStudent(newUser, newStudent,false ,(err,instructor )=>{
            if(err) throw err
          console.log('Instructor model created')
          req.flash('registered','Registered successfully!' )
          res.redirect('/users/signup')
        })
      }
    }
 })

router.route('/login')
  .get((req,res)=>{
  res.json({log: 'you arent registered'})
  })
  .post((req,res)=>{
    console.log(req.body);
    res.json({message: 'msg'})
  })


module.exports= router
