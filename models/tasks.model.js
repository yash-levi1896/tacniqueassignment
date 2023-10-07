const mongoose=require('mongoose');

const taskschema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    creationDate:{
        type:Date,
        required:true,
        default:Date.now()
    },
    status:{
        type:String,
        enum:["pending","completed"],
        default:"pending"
    }
    
});

const Task = mongoose.model("task",taskschema);

module.exports=Task;