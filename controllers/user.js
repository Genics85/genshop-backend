const bcrypt=require("bcrypt");

const userLogin= async (req,res)=>{
    const{email,password}=req.body;
    if(!email || !password) return res.json({msg:"Email or password cant be empty"});

}
const userSignup = async (req,res)=>{
    const{email,password,name}=req.body;
    if(!email||!password||!name) return res.json({msg:"Email, password or name cant be empty"});
    
    const hashedPassword = bcrypt.hash(password,10);
}
const getUsers = async (req,res) =>{
    console.log("this returns all users in the database");
}

module.exports = {userLogin,userSignup,getUsers};