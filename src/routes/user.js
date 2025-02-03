const express = require("express");
const userRouter = express.Router();
const {authUser} = require("../middlewares/auth");


//getting all the pending connection request for the loggedIn user
userRouter.get("/user/requests", authUser, (req, res) => {

    //everytime we are writing just req.user because when we call the authUser function so in that we have passed the user = req.user so whenever we need the data from the User Schema, we dont need to import the Schema again and again because we are calling the middleware and that is already includes that User Schema, so just writing the const loggedInUser = req.user we will get the User Id

  try {
    const loggedInUser = req.user;
  } catch (err) {
    res.status(400).json({ message: "Something Went Wrong" + err.message });
  }
});

module.exports = userRouter;
