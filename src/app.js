const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Virat",
    lastName: "Kohli",
    email: "viratkohli@gmail.com",
    password: "xyz",
  });

  try {
    await user.save();
    res.send("Data Added Successfully");
  } catch (err) {
    res.status(400).send("Failed to connect");
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
