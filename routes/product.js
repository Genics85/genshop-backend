const express = require("express");
const router=express.Router();

router.route("/")
    .post((req,res)=>{
        res.send("post a product to the backend")
    })

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