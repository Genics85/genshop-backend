const userLogin= async (req,res)=>{
    console.log("user login from controller");
}
const userSignup = async (req,res)=>{
    console.log("user signin from controller");
}
const getUsers = async (req,res) =>{
    console.log("this returns all users in the database");
}

module.exports = {userLogin,userSignup,getUsers};