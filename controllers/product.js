const cloudinary = require("../config/cloudinaryConfig");
const multer = require("../config/multerConfig");

const upload= async(req,res)=>{
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        res.json(result);
    } catch (error) {
        console.log(error)
    }
}

module.exports = upload;