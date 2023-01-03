const express=require("express");
const { mongoose } = require("mongoose");
const app=express();
const mongoConnection=require("./config/mongodbConfig")
require("dotenv").config();
const PORT=process.env.PORT || 5000;

//Connecting to mongodb
mongoConnection();

//middleware for user route
app.use(express.json());
app.use("/user",require("./routes/user"));

mongoose.connection.once("open",()=>{
    console.log("connected to mogodb");

    app.listen(PORT,(req,res)=>{
        console.log(`listening for connections on port ${PORT}`);
    })
});