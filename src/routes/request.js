const express = require("express");
const requestRouter = express.Router();
const { authUser } = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest", authUser, async (req, res) => {
    try {
      console.log("Sending a connection request");
    } catch (err) {
      res.status(400).send("Something Went Wrong : " + err.message);
    }
    const user = req.user;
    res.send(user.firstName + " sent the Connection Request");
  });


module.exports = requestRouter;