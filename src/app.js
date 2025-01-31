const express = require("express");
const connectDB = require("./config/database");
const app = express();
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const cookieParser = require("cookie-parser");

app.use(express.json()); //if we dont use this, it will return undefined for the req.body
app.use(cookieParser()); //if we dont use this, it will return undefined for the cookie fetching


app.use("/", authRouter, profileRouter, requestRouter);

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
