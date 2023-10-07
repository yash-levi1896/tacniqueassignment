const mongoose=require('mongoose');

const userschema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:String,
    
});

const User = mongoose.model("user",userschema);

module.exports=User;