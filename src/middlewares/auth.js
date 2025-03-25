const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authUser = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      return res.status(401).send("Please Login!!");
    }

    const decodedObj = await jwt.verify(token, "Priyanshu@123");

    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User Not found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Something Went Wrong" + err.message);
  }
};

module.exports = {
  authUser,
};
