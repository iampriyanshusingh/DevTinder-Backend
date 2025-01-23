const mongoose = require("mongoose");

const connectDB =  async () =>{
    await mongoose.connect("mongodb+srv://iampriyanshusingh:5w7wNHiEuxL0YjTY@iampriyanshusingh.gdzxn.mongodb.net/devTinder");
};

module.exports = connectDB;