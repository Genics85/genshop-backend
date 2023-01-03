const express=require("express");
const { mongo } = require("mongoose");
const app=express();
const mongoConnection=require("./config/mongodbConfig")
require("dotenv").config();
const PORT=process.env.PORT || 5000;


//middleware for user route
app.use("/user",require("./routes/user"));


mongoConnection();

app.listen(PORT,(req,res)=>{
    console.log(`listening for connections on port ${PORT}`);
})