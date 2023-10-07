const express=require('express');
const {connection} = require('./config/db');
const cookie = require('cookie-parser');
const { userRouter } = require('./router/user.route');
const taskRouter = require('./router/task.route');
const fs=require('fs');
const path=require('path');
const morgan=require('morgan')
const { authentication } = require('./middleware/auth.middleware');

var accessLogStream = fs.createWriteStream(path.join(__dirname, './access.log'), { flags: 'a' })



app=express()

app.use(express.json())

app.use(cookie())

app.use(morgan(':method :status :res[content-length] - :response-time ms :date[web] :http-version :url',{ stream: accessLogStream }));

app.use("/",userRouter);

app.use(authentication);

app.use("/tasks",taskRouter)





app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log(error.message)
    }
    console.log("server is running")
})