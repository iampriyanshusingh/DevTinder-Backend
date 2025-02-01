const express = require("express");
const profileRouter = express.Router();
const { authUser } = require("../middlewares/auth");
const bcrypt = require("bcrypt");
const {
  validateEditProfileData,
  validatePasswordByUser,
} = require("../helpers/validation");

//getting data
profileRouter.get("/profile/view", authUser, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Something Went Wrong");
  }
});

//updating the data
profileRouter.patch("/profile/edit", authUser, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, Your Profile is updated Successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.statusMessage(400).send("ERROR : " + err.message);
  }
});

//updating the password
profileRouter.patch("/profile/password", authUser, async (req, res) => {
  try {
    // const isPasswordValid = await validatePasswordByUser(req);
    // if (!isPasswordValid) {
    //   res.status(401).send("Invalid Old Password");
    // }
    const loggedInUser = req.user;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    loggedInUser.password = hashedPassword;
    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName}, Your Password is updated Successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("Invalid Request : " + err.message);
  }
});

module.exports = profileRouter;
