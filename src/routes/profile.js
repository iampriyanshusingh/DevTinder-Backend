const express = require("express");
const profileRouter = express.Router();
const { authUser } = require("../middlewares/auth");

//getting data
profileRouter.get("/profile", authUser, async (req, res) => {
    try {
      const user = req.user;
      res.send(user);
    } catch (err) {
      res.status(400).send("Something Went Wrong");
    }
  });
  
 
module.exports = profileRouter;