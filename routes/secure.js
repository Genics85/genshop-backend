const express = require("express");
const router = express.Router();
const verifyJWT=require("../middlewares/verifyJWT");

router.route("/")
    .get(verifyJWT,(req,res)=>{
        console.log("this is the secure route");
    });

router.route("/non")
    .get((req,res)=>{
        console.log("this is the no secure route page");
    })

module.exports = router;