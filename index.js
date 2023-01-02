const express=require("express");
const app=express();
const PORT=process.env.PORT || 5000;

//middleware for user route
app.use("/user",require("./routes/user"));

app.listen(PORT,(req,res)=>{
    console.log(`listening for connections on port ${PORT}`);
})