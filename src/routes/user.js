const express = require("express");
const userRouter = express.Router();
const { authUser } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

//getting all the pending connection request for the loggedIn user
userRouter.get("/user/requests/received", authUser, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate(
      "fromUserId",
      ["firstName", "lastName"]
      //if i dont pass the array so it will return the whole data of that User
      // i can also pass the strings instead of the array like "firstName lastName"
    );

    res.json({ message: "data sent successfully", data: connectionRequests });
  } catch (err) {
    res.status(400).json({ message: "Something Went Wrong" + err.message });
  }
});

module.exports = userRouter;

//everytime we are writing just req.user because when we call the authUser function so in that we have passed the user = req.user so whenever we need the data from the User Schema, we dont need to import the Schema again and again because we are calling the middleware and that is already includes that User Schema, so just writing the const loggedInUser = req.user we will get the User Id
