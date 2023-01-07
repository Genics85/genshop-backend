const express = require("express");
const router=express.Router();
const upload = require("../controllers/product");
const multer = require("../config/multerConfig");

router.route("/")
    .post(multer.single("image"),upload)
    .get((req,res)=>{console.log("get all items")})

router.route("/electronics")
    .get((req,res)=>{
        res.send("all electronic products")
    })
router.route("/home")
    .get((req,res)=>{
        res.send("get all home and office products")
    })
router.route("/groceries")
    .get((req,res)=>{
        res.send("get all groceries")
    })