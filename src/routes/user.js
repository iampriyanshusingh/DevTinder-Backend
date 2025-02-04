const express = require("express");
const userRouter = express.Router();
const { authUser } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const USER_SAFE_DATA = "firstName lastName age Gender skills";

//getting all the pending connection request for the loggedIn user
userRouter.get("/user/requests/received", authUser, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate(
      "fromUserId",
      USER_SAFE_DATA
      // ["firstName", "lastName"]
      //if i dont pass the array so it will return the whole data of that User
      // i can also pass the strings instead of the array like "firstName lastName"
    );

    res.json({ message: "data sent successfully", data: connectionRequests });
  } catch (err) {
    res.status(400).json({ message: "Something Went Wrong" + err.message });
  }
});

userRouter.get("/user/connections", authUser, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === row.toUserId._id.toString()) {
        return row.toUserId;
      }
      row.fromUserId;
    });

    res.json({ data });
  } catch (err) {
    res.status(400).send({ message: "Something Went Wrong" + err.message });
  }
});

userRouter.get("/feed", authUser, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    limit = limit > 50 ? 50 : limit;

    const skip = (page - 1) * limit;

    //geting all the connection Request which is sent or received
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hideUserFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUserFromFeed.add(req.fromUserId.toString());
      hideUserFromFeed.add(req.toUserId.toString());
    });

    const user = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.send(user);
  } catch (err) {
    res.status(400).send({ message: "Something Went Wrong" + err.message });
  }
});

module.exports = userRouter;

//everytime we are writing just req.user because when we call the authUser function so in that we have passed the user = req.user so whenever we need the data from the User Schema, we dont need to import the Schema again and again because we are calling the middleware and that is already includes that User Schema, so just writing the const loggedInUser = req.user we will get the User Id
