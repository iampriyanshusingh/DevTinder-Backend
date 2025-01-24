const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("Data Added Successfully");
  } catch (err) {
    res.status(400).send("Failed to connect");
  }
});

//getting data from the Email (All Data with same Email Id)
app.get("/email", async (req, res) => {
  const emailId = req.body.email;
  try {
    const user = await User.find({ email: emailId });
    res.send(user);
  } catch (err) {
    res.status(404).send("Email Not Found");
  }
});

//getting all the user's data, basically for the feed API
app.get("/user", async (req, res) => {
  const user = await User.find({}); //passing an empty object will give all the user's data
  try {
    res.send(user);
  } catch (err) {
    res.status(404).send("User not Found");
  }
});

//getting one data of the duplicate Email Id
app.get("/emailOne", async (req, res) => {
  const emailId = req.body.email;
  console.log(emailId);
  try {
    const user = await User.findOne({ email: emailId });
    //if we dont pass any object in the findOne, it will give the any arbitary info from the database
    if (!user) {
      res.status(404).send("Email Not Found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(404).send("Data Not Found");
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
