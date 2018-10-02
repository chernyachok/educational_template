const bcrypt = require('bcryptjs');

var salt = bcrypt.genSaltSync(10);


var comp = (callback)=>{
  var temp = 123
  temp = bcrypt.hash('user', salt).then((hash)=>{
    callback(hash)
  })

}

comp((data)=>{
  console.log(data)
})

console.log('after ')
