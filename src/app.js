const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validation } = require("./helpers/validation");
const bcrypt = require("bcrypt");

app.use(express.json());


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
app.post("/login", async(req,res)=> {
  try{
    const{email,password} = req.body;

    const user = await User.findOne({email:email})
    if(!user){
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      throw new Error("Invalid Credentials");
    }
    res.status(200).send("Login Successfully!!!");
  }catch(err){
    res.status(400).send("Invalid Credentials");
  }
})

//updating the data
app.patch("/update/:userId", async (req, res) => { 
  // first parameter is route Name, second is Request Handler, third option will be callback function that consist object
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const Allowed_Updates = [
      "firstName",
      "lastName",
      "Gender",
      "age",
      "password",
      "skills",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      Allowed_Updates.includes(k)
    );
    if (!isUpdateAllowed) {
      res.status(400).send("Can't Update Data");
    }

    if (data?.skills.length > 10) {
      res.status(400).send("Invalid Response");
    }
    await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });
    res.send("Data Updated Successfully");
  } catch (err) {
    res.status(500).send("Something Went Wrong");
  }
});

//deleting the data
app.delete("/delete", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("Data Deleted Successfully");
  } catch (err) {
    res.status(500).send("Something Went Wrong");
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

//getting info from the Id
app.get("/getId", async (req, res) => {
  const Id = req.body._id;
  try {
    const user = await User.findById(Id);

    if (!user) {
      res.status(404).send("Id Not Found");
    }
    res.send(user);
  } catch (err) {
    res.status(500).send("Something Went Wrong");
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
