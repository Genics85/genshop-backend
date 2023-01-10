const express = require("express");
const router = express.Router();
const verifyJWT=require("../middlewares/verifyJWT");
const verifyRole=require("../middlewares/verifyRole");

router.route("/")
    .get((req,res)=>{
        console.log("this is the secure route");
    })
    .post(verifyRole(["seller"]),(req,res)=>{
        console.log("trying to post")
    })

router.route("/non")
    .get((req,res)=>{
        console.log("this is the no secure route page");
    })

module.exports = router;