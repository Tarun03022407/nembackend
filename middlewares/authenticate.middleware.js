const e = require("express");
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, "masai");
    if (decoded) {
      const userID= decoded.userID
      console.log(userID);
      req.body.userID=userID
      next();
    } else {
      res.send("please login first");
    }
  } else {
    res.send("please login first");
  }
};
module.exports = { authenticate };
