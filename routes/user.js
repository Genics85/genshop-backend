const express=require("express");
const router=express.Router();
const user = require("../controllers/user");

router.route("/login")
    .post(user.userLogin)

router.route("/logout")
    .get(user.userLogout)

router.route("/refresh")
    .get(user.userRefreshToken)

router.route("/signup")
    .post(user.userSignup)


module.exports = router