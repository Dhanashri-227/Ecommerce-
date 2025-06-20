const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    shopname : {
      type : String,
      required : true ,
      unique : true 
   } ,  
    ownername :{
      type : String ,
      unique : true ,
      required : true 
   },
  
   password : {type : String ,
      required : true ,
      unique : true ,
   },
    email :{
      type : String ,
      required : true ,
      unique : true
    }
}, {timestamps : true});


module.exports = mongoose.model('User', userSchema);