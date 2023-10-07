// Import required modules and controllers

const express=require('express');
const { register, login } = require('../controller/user.controller');

// Create a new Express Router instance
const userRouter = express.Router();

// Route for user registration (POST /register)
userRouter.post("/register",(req,res)=>{
    register(req,res); // Call the register controller function
})

// Route for user login (POST /login)
userRouter.post("/login",(req,res)=>{
    login(req,res);  // Call the login controller function
})

module.exports={userRouter}