const { AddTask, GetAllTask, GetTaskById, DeleteTask, UpdateTask } = require("../controller/task.controller");

const express = require('express');
const limiter = require("../middleware/ratelimiting.middleware");

const taskRouter=express.Router();

taskRouter.post("/",(req,res)=>{
    AddTask(req,res)
});

taskRouter.get("/",limiter,(req,res)=>{
    GetAllTask(req,res)
});

taskRouter.get("/:id",(req,res)=>{
    const {id} = req.params
    GetTaskById(req,res,id)
});

taskRouter.put("/:id",(req,res)=>{

    const {id} = req.params
    UpdateTask(req,res,id)
})

taskRouter.delete("/:id",(req,res)=>{
    const {id} = req.params
    DeleteTask(req,res,id)
});




module.exports = taskRouter;