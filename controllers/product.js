const cloudinary = require("../config/cloudinaryConfig");
const multer = require("../config/multerConfig");
const Products = require("../models/product");

const upload = async (req, res) => {
  const { name, price, category } = req.body;
  try {
    if (!name || !price || !category)
      return res.status(403).json({ msg: "name,price or size can't be empty" });
    const result = await cloudinary.uploader.upload(req.file.path);
    if (!result.secure_url || !result.public_id)
      return res.status(400).json({ msg: "Failed to upload to Cloudinary" });

    const product = await Products.create({
      name: name,
      price: price,
      category: category,
      cloudinary_id: result.public_id,
      img: result.secure_url,
    });
    res.json(product);
  } catch (error) {
    console.log(error);
  }
};

const remove = async(req,res)=>{
try {
    const product= await Products.findById(req.params.id);
    await cloudinary.uploader.destroy(product.cloudinary_id);
    await product.remove();
    console.log("deleted");
    res.json(product);
} catch (error) {
    console.log(error)
}
}

const getCategory= (type)=>{

  return async(req,res)=>{
    try{
      const product=await Products.find({category:type});
      if(product.length<1) return res.status(404).json({msg:"products not found or empty"});
      res.json(product);
    }catch(error){
      console.log(error);
    }
  }
}

const getAll= async(req,res)=>{
  try {
    const allProducts=await Products.find();
    res.status(200).json(allProducts);
  } catch (error) {
    console.log(error)
  }
}

module.exports = {upload, remove, getCategory,getAll};
