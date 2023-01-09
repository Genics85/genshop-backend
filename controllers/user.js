const bcrypt = require("bcrypt");
const Users = require("../models/user");
const jwt = require("jsonwebtoken");

//controller for logging in a user
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "Email or Password cant be empty" });
    const foundUser = await Users.findOne({ email: email });
    if (!foundUser)
      return res
        .status(400)
        .json({ msg: "Email does not have an account, consider signup" });
    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch)
      return res.status(401).json({ msg: "Wrong password, try again" });
    const accessToken = jwt.sign(
      {
        userInfo: {
          email: foundUser.email,
          role: foundUser.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5m" }
    );
    const refreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    foundUser.refreshToken = refreshToken;
    //saving refreshToken in users database
    const result = await foundUser.save();
    console.log(result);
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ accessToken });
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

const userRefreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).json({ msg: "no cookies" });
    const refreshToken = cookies.jwt;
    const foundUser = await Users.findOne({ refreshToken: refreshToken });
    if (!foundUser) return res.status(403).json({ msg: "user does not exist" });
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decode) => {
        if (err || foundUser.email !== decode.email)
          return res.status(403).json({ msg: "bad token" });
        const accessToken = jwt.sign(
          {
            userInfo: {
              email: decode.email,
              role: decode.role,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "5m",
          }
        );
        res.status(200).json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const userLogout = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;
    const foundUser = await Users.findOne({ refreshToken: refreshToken });
    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      res.sendStatus(204);
    }
    //deleting refreshToken from database
    foundUser.refreshToken = "";
    const result = await foundUser.save();
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.sendStatus(204);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userLogin,
  userSignup,
  userLogout,
  userRefreshToken,
};
