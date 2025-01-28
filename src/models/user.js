const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 30,
    },
    lastName: {
      type: String,
    },
    Gender: {
      type: String,
      required: true,
      lowerCase:true,
      validate(value){
        if(!["male","female","others"].includes(value)){
            throw new Error("Gender Not Exist");
        }
      }
    },
    age: {
      type: Number,
      required: true,
      min: 18,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim:true,
    },
    password: {
      type: String,
      required: true,
    },
    skills: [String]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
