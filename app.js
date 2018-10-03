const dotenv = require('dotenv');
dotenv.config();

var express = require('express');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
const expressCookieParser = require('cookie-parser');
const path = require('path');
const expressValidator = require('express-validator')
const flash =require('express-flash');
const session = require('express-session');
const passport = require("passport");
const localStrategy = require('passport-local').Strategy;
const indexRoute = require('./routes/index.js')
const classRoute = require('./routes/classes.js');
const usersRoute  =require('./routes/users.js')
const students =require('./routes/students.js')


var port = process.env.PORT || 3000;
var host = process.env.DB_HOST || 'unknown host';
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.set('views', path.join(__dirname,'views'));
app.engine('hbs', expressHbs({defaultLayout: 'layout', layoutsDir:'views/layouts', extname: 'hbs'}));

app.set('view engine', 'hbs');

app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}))
app.use(expressCookieParser());
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


app.use(expressValidator())


app.use((req,res,next)=>{
  res.locals.messages =require('express-messages')(req,res)
  if(req.url == '/'){
    res.locals.isHome = true;
  }
  res.locals.user = req.user || null
  next()
})

app.use('/', indexRoute);
app.use('/classes', classRoute);
app.use('/users', usersRoute)
app.use('/students', students)




app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err,
        status : err.status
    });
});

app.listen(port, host, ()=>{
  console.log(host+' listening on port'+ port);
})
