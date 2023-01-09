const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ msg: "unauthorised user" });
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ msg: "Fake token" });
    req.user = decoded.userInfo.email;
    req.role = decoded.userInfo.role;
    next();
  });
};

module.exports = verifyJWT;
