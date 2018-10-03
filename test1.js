const User = require('./config/user');


User.find({usernamsse: "wewedfdsd"}).then((data)=>{
  console.log(data)
}).catch((err)=>{
  console.log('made a mistake')
})
