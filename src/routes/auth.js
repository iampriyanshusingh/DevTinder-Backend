const express = require('express');
const app = express();
const authRouter = express.Router();
const {validation} = require("../helpers/validation");
const User = require("../models/user");


//singup API
authRouter.post("/signup", async (req, res) => {
    const { firstName, lastName, email, password, Gender, skills, age } =
      req.body;
  
    try {
      //validation
      validation(req);
      
      //creating new instance of the User model
      const user = new User({
        firstName,
        lastName,
        email,
        password,
        Gender,
        age,
      });
  
      //encryption
      const passwordHash = await user.generatePassword();
      user.password = passwordHash;
  
      await user.save();
      res.send("Data Added Successfully");
    } catch (err) {
      console.error("Error:", err.message);
      res.status(400).send(err.message);
    }
  });

//login API
authRouter.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
   
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error("Invalid Credentials");
      }
      const isPasswordValid = await user.validatePassword(password);
      if (!isPasswordValid) {
        throw new Error("Invalid Credentials");
      }
  
      //create a JWT token
      const token = await user.getJWT();
      res.cookie("token", token);
  
      res.status(200).send("Login Successfully!!!");
    } catch (err) {
      res.status(400).send("Invalid Credentials");
    }
  });

module.exports = authRouter;