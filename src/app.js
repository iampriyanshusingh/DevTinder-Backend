const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validation } = require("./helpers/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { authUser } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

//singup API
app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, Gender, skills, age } =
    req.body;

  try {
    //validation
    validation(req);
    //encryption
    const passwordHash = await bcrypt.hash(password, 10);
    //creating new instance of the User model
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      Gender,
      age,
    });

    await user.save();
    res.send("Data Added Successfully");
  } catch (err) {
    console.error("Error:", err.message);
    res.status(400).send(err.message);
  }
});

//login API
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid Credentials");
    }

    //create a JWT token
    const token = await jwt.sign({ _id: user._id }, "Priyanshu@123");
    res.cookie("token", token);

    res.status(200).send("Login Successfully!!!");
  } catch (err) {
    res.status(400).send("Invalid Credentials");
  }
});

//getting data
app.get("/profile", authUser, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Something Went Wrong");
  }
});




connectDB()
  .then(() => {
    console.log("dataBase connected Successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("DataBase Cant connected");
  });
