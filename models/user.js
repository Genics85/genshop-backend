const mongoose= require("mongoose");
const roles=require("../config/rolesList");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:roles,
        default:roles[0]
    },
    refreshToken:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("User",userSchema);