const bcrypt = require("bcrypt");
const Users = require("../models/user");
const jwt = require("jsonwebtoken");

//controller for logging in a user
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "Email or Password cant be empty" });
    const user = await Users.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "Email does not have an account, consider signup" });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(401).json({ msg: "Wrong password, try again" });
    const accessToken = jwt.sign(
      { email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    const refreshToken = jwt.sign(
      { email: user.email },
      process.env.REFRESH_TOKEN_SECRET,
      {expiresIn:"30d"}
    );
    console.log(refreshToken);
    user.refreshToken=refreshToken;
    const result=await user.save();
    res.status(200).json({ accessToken});
    console.log(result);
  } catch (error) {
    console.log(`${error}`);
  }
};

//controller for signing up a user
const userSignup = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name)
      return res
        .status(400)
        .json({ msg: "Email, password or name cant be empty" });
    const notAvailable = await Users.findOne({ email: email });
    if (notAvailable)
      return res.status(409).json({
        msg: "Email already has an account,consider logging in",
      });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    console.log(newUser);
    res.status(201).json({ msg: "success" });
  } catch (error) {
    console.log(`${error}`);
  }
};

const getUsers = async (req, res) => {
  console.log("this returns all users in the database");
};

module.exports = { userLogin, userSignup, getUsers };
