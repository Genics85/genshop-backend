const {Schema}=require("mongoose");

const productsSchema = new Schema({
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
        data: Buffer,
        ContentType:"image/png",
        require:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("Product",productsSchema);