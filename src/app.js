const express = require("express");
const {authAdmin, authUser} = require("./middlewares/auth.js");

const app = express();

app.use("/admin", authAdmin);

app.get("/admin/getAllData", (req,res) => {
  res.send("Getting all the data");
})

app.get("/admin/deleteAllUser", (req,res)=>{
  res.send("Deleted the data");
})

app.post("/user/login", (req,res) => {
  res.send("logged in successfully");
})

app.get("/user/getData", authUser, (req,res) => {
  res.send("getting the data");
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});