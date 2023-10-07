const Task = require('../models/tasks.model')

async function AddTask(req,res){
    
    try {
        // Create a new Task instance with the data from the request body   
        let task = await new Task(req.body)
        
        // Save the task to the database
        task.save();
        
        // Send a success response with status code 201 (Created) and a message
        return res.status(201).send({msg:"task added!"})
    } catch (error) {
        // If there is an error, send an internal server error response with status code 500
        // and the error message in the response body
        return res.status(500).send({msg:error.message})
    }
}

async function GetAllTask(req,res){

    try {
        // Find all tasks in the database
        let tasks = await Task.find();
        
        // If no tasks are found, send a response with status code 404 (Not Found)
        if(tasks.length===0){
            return res.status(404).send({msg:"tasks not found"})
        }else{
            // If tasks are found, send a response with status code 200 (OK) and the tasks in the response body
            return res.status(200).send({msg:tasks})
        }

    } catch (error) {
        // If there is an error (e.g., database error), send an internal server error response with status code 500 (Internal Server Error)
        // and a generic error message in the response body

        return res.status(500).send({msg:"Internal server error"})
    }
}

async function GetTaskById(req,res,id){

    try {
        // Find a task by its ID in the database
        let task = Task.find({_id:id});

        if(task.length===0){
            //if no task is found
            return res.status(404).send({msg:"tasks not found"})
        }else{
            // If the task is found, send a response with status code 200 (OK) and the task in the response body
            return res.status(200).send({msg:task})
        }

    } catch (error) {
        // If there is an error during the database operation, send an internal server error response with status code 500 (Internal Server Error)
        // and a generic error message in the response body
        return res.status(500).send({msg:"Internal server error"})
    }
}

async function UpdateTask(req,res,id){

    const {title , description , creationDate , status} = req.body
    try {

        // Check if all required fields are present in the request body
        if(title && description && creationDate && status){
            // Update the task in the database using Task.findByIdAndUpdate()
            await Task.findByIdAndUpdate({_id:id},req.body)

            // Send a success response with status code 200 (OK) and a message indicating the task was updated
            return res.status(204).send({msg:"task updated!"})

        }else{
            // If any required field is missing, send a response with status code 409 (Conflict) and a message indicating missing fields
            return res.status(400).send({msg:"All fileds are required!"})
        }
    } catch (error) {
        // If there is an error during the database operation, send an internal server error response with status code 500 (Internal Server Error)
        // and a generic error message in the response body
        return res.status(500).send({msg:"Internal server error!"})
    }
}

async function DeleteTask(req,res,id){
    try {
        await Task.findByIdAndDelete({_id:id}); //find the task and delete the task.

        return res.status(200).send({msg:"task deleted !"}) //send the response

    } catch (error) {
        return res.status(500).send({msg:"Internal server error!"}) //handle internal error.
    }
}

module.exports={AddTask , GetAllTask , GetTaskById , UpdateTask , DeleteTask}