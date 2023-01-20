const mongoose=require("mongoose");

const productsSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true,
    },
    category:{
        type:String,
        require:true
    },
    img:{
        type:String,
        require:true
    },
    cloudinary_id:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("Product",productsSchema);