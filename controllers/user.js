const bcrypt = require("bcrypt");
const Users = require("../models/user");

//controller for logging in a user
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.json({ msg: "Email or password cant be empty" });
  } catch (error) {
    console.log(`${error}`)
  }
};

//controller for signing up a user
const userSignup = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name)
      return res.json({ msg: "Email, password or name cant be empty" });
    const notAvailable = await Users.findOne({ email: email });
    if (notAvailable)
      return res.json({
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
