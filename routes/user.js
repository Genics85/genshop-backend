const express=require("express");
const router=express.Router();
const user = require("../controllers/user");

router.route("")
    .get(user.getUsers)

router.route("/login")
    .post(user.userLogin)

router.route("/signup")
    .post(user.userSignup)


module.exports = router