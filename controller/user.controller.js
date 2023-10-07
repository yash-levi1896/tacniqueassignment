const User = require("../models/user.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function register(req,res){
    const {email,password} = req.body  

    if(email&&password){    // check if both email and password is present in req.body
        const user = await User.find({email});    //find user with given email

        try {
            if(user.length===0){                  // if user doesn't exist than register it.
                bcrypt.hash(password,5,async(err,hash)=>{     // hash the password
                    if(err)
                    throw err
                    
                    let newuser = new User({email,password:hash});  //create the instance of User

                    newuser.save();                                 // save the instance in database

                    return res.status(201).send({msg:"user registered!"})  // return the response
                })
            }else{
                return res.status(200).send({msg:"user already registered!"})  // if user already exist 
            }
        } catch (error) {
            return res.status(500).send({msg:"can't registered network error!"})   // handle the error
        }
    }else{
        return res.status(400).send({msg:"both field are required!"})      // if required field is missing
    }
}

async function login(req,res){
    // Destructure email and password from the request body
    const {email,password} = req.body
    
    // Check if both email and password are provided in the request body
    if(email&&password){
        try {
            // Find user by email in the database
            let user=await User.find({email});
            
            // If user with the provided email is found
            if(user.length>0){

                // Compare the provided password with the stored hashed password
                bcrypt.compare(password,user[0].password,async(err,result)=>{
                    // Handle bcrypt compare errors
                    if(err)throw err;
                    
                     // If passwords match
                    if(result){

                        // Generate a JSON Web Token (JWT) for user authentication
                        token = jwt.sign({'userID':user[0]._id},process.env.secret_key)
                        
                        // Set the JWT token as an HTTP-only cookie with a max age of 1 hour (3600000 milliseconds)
                        res.cookie("accessToken",token,{maxAge:1000*60*60,httpOnly:true,secure:false})
                        
                        // Send a success response with a message indicating successful login
                        return res.status(200).send({msg:"sucessfully Login!"})
                    
                    }else{
                        // If passwords do not match, send an unauthorized (401) response
                        return res.status(401).send({msg:"Wrong credentials"})
                    }
                })
            }else{
                // If user with the provided email is not found, send a bad request (400) response
                return res.status(404).send({msg:"User not found , please registerd first!"})
            }
        } catch (error) {
            // Handle database or other errors and send a bad request (400) response with the error message
            res.status(500).send({"msg":error.message});
        }
    }else{
        // If email or password is missing, send a conflict (409) response indicating missing fields
        return res.status(400).send({msg:"fill both the field!"})
    }

}

module.exports={register , login}