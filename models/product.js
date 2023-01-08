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
    size:{
        type:String,
        enum:["sm","md","lg"],
        default:"sm"
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